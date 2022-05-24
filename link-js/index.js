var getIconForOs, getOs, getTagClass, injectCss, isYaml, isYamlOrJson, splitThenAdd, stripQuotes;

injectCss = function(css) {
  var el, elId, type;
  elId = 'inject-css';
  type = void 0;
  if (typeof css === 'string') {
    css = css.trim();
  } else {
    return false;
  }
  if (css.indexOf('/') === 0 || css.indexOf('http:') === 0 || css.indexOf('https:') === 0) {
    type = 'link';
  } else {
    type = 'style';
  }
  el = document.getElementById(elId);
  if (el != null) {
    el.parentNode.removeChild(el);
  }
  el = document.createElement(type);
  el.type = 'text/css';
  el.id = elId;
  if (type === 'link') {
    el.rel = 'stylesheet';
    el.href = css;
  } else {
    el.innerHTML = css;
  }
  document.head.appendChild(el);
  return el;
};

getOs = function() {
  var platform;
  platform = navigator.platform.toUpperCase();
  if (platform.indexOf('MAC') > -1) {
    return 'mac';
  }
  if (platform.indexOf('WIN') > -1) {
    return 'windows';
  }
  if (platform.indexOf('LINUX') > -1) {
    return 'linux';
  }
  return 'windows';
};

isYamlOrJson = function(str) {
  return /\.(ya?ml|json)$/.test(str);
};

isYaml = function(str) {
  return /\.(ya?ml)$/.test(str);
};

stripQuotes = function(str) {
  return str.replace(/^"(.*)"$/, '$1');
};

getTagClass = function(val) {
  var cls;
  cls = 1;
  if (val > 10) {
    cls = 10;
  }
  if (val > 25) {
    cls = 25;
  }
  if (val > 50) {
    cls = 50;
  }
  if (val > 100) {
    cls = 100;
  }
  return 'tag-' + cls;
};

splitThenAdd = function(val, add) {
  return val.split('\n').concat(add).join('\n');
};

getIconForOs = function(str) {
  if (str.includes('mac')) {
    return 'fa-apple';
  }
  if (str.includes('windows')) {
    return 'fa-windows';
  }
  if (str.includes('linux')) {
    return 'fa-linux';
  }
  return '';
};

var getEngine, getTypeIcon, setDefaults, suggestionFn;

setDefaults = function(links) {
  return links.map(function(i) {
    if (typeof i.type === 'undefined') {
      i.type = 'page';
    }
    return i;
  });
};

getEngine = function(links) {
  links = setDefaults(links);
  return new Bloodhound({
    datumTokenizer: function(obj) {
      var tokens;
      tokens = [];
      tokens = tokens.concat(Bloodhound.tokenizers.whitespace(obj.name.replace(/[\(\)]/g, ''))).concat(obj.tags.map(function(i) {
        return '#' + i;
      })).concat(':' + obj.type).concat(obj.url);
      return tokens;
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: links,
    identify: function(obj) {
      return obj.name;
    }
  });
};

getTypeIcon = function(type) {
  var typeClass;
  typeClass = '';
  switch (type) {
    case 'file':
      typeClass = 'fa-download';
      break;
    case 'bookmark':
      typeClass = 'fa-bookmark';
      break;
    default:
      typeClass = 'fa-external-link-square';
  }
  return typeClass;
};

suggestionFn = function(obj) {
  var tags;
  tags = obj.tags.map(function(i) {
    return '#' + i;
  }).join(' ');
  return `<div><div class="ta-obj">
  <div class="ta-row">
    <span class="name">${obj.name}</span>
    <span class="type"><i class="fa ${getTypeIcon(obj.type)}"></i></span>
    <span class="tags">${tags}</span>
  </div>
  <div class="ta-row">
    <span class="url">${obj._url}</span>
  </div>
</div></div>`;
};

angular.module('App', ['ngRoute', 'ngStorage', 'angular-cache']).constant('sourcesUrl', 'https://api.github.com/repos/links-js/db/contents/').filter('tagReplace', function() {
  return function(input) {
    if (input) {
      return input.replace(/tag:/gi, '#');
    } else {
      return '';
    }
  };
}).filter('noReferrer', function() {
  return function(input) {
    return 'https://href.li/?' + input;
  };
}).filter('filename', function() {
  return function(input) {
    return input.split('/').slice(-1)[0];
  };
}).filter('getFaviconUrl', function() {
  return function(input) {
    return 'https://www.google.com/s2/favicons?domain_url=' + input;
  };
}).filter('getLastItem', function() {
  return function(arr) {
    return arr.slice(-1)[0];
  };
}).filter('hasYamlOrJson', function() {
  return function(obj) {
    return isYamlOrJson(obj.name);
  };
}).filter('getIconForOs', function() {
  return getIconForOs;
}).factory('LinksLoader', ["$http", "$q", "$rootScope", "$filter", function($http, $q, $rootScope, $filter) {
  var combineObjects, getData, getObjWithLinks, reduceAllObj;
  getData = function(response) {
    var data, url;
    url = response.config.url;
    data = null;
    data = isYaml(url) ? data = jsyaml.load(response.data) : data = response.data;
    // Add _url to all response data object
    data._url = url;
    return data;
  };
  getObjWithLinks = function(obj) {
    if (Boolean(obj) && (obj instanceof Object)) {
      if (obj.hasOwnProperty('links')) {
        return true;
      }
    }
    console.error('Incorrect object:', obj);
    return false;
  };
  reduceAllObj = function(prevArr, curObj) {
    var links;
    // _source for identify - base64
    links = curObj.links.map(function(link) {
      link._url = curObj._url;
      link._source = window.btoa(curObj._url);
      return link;
    });
    return prevArr.concat(links);
  };
  combineObjects = function(objArray) {
    // discard everything else that doesn't have 'links' property then combine all files
    objArray.push(objArray.filter(getObjWithLinks).reduce(reduceAllObj, []));
    return objArray;
  };
  return {
    load: function() {
      var promises, urls;
      urls = $rootScope.settings.url.split('\n').filter(function(url) {
        return url.length > 0;
      });
      promises = urls.map(function(url) {
        return $http.get(url).then(getData, function(err) {
          console.error('HTTP error:', err);
          return $q.reject(err);
        });
      });
      return $q.all(promises).then(combineObjects).then($filter('getLastItem'));
    }
  };
}]).directive('myTypeahead', function() {
  return {
    restrict: 'C',
    scope: true,
    link: function(scope, el, attrs) {
      var dataset, engine, input, options;
      options = {
        hint: false,
        highlight: true,
        minLength: 1
      };
      dataset = {
        name: 'links',
        source: null,
        limit: scope.$root.settings.limit,
        templates: {
          suggestion: suggestionFn
        },
        display: 'name'
      };
      input = $(el[0]);
      engine = null;
      scope.$root.$watch('loadedLinks', function(nVal, oVal) {
        if (nVal) {
          dataset.source = getEngine(scope.$root.loadedLinks);
          input.typeahead(options, dataset);
          input.bind('typeahead:select', function(e, obj) {
            var target;
            target = scope.$root.settings[obj.type === 'page' ? 'openPage' : 'openFile'];
            target = stripQuotes(target);
            target = target === 'new' ? '_blank' : '_self';
            return window.open(obj.url, target);
          });
        }
        return input.focus();
      });
      return scope.$watch('term', function() {
        return input.val(scope.term).trigger('input').focus();
      });
    }
  };
}).factory('Settings', ["$localStorage", function($localStorage) {
  var storageDefault, urls;
  urls = ['/db/db-global.yml', '/db/db-' + getOs() + '.yml'].join('\n');
  storageDefault = {
    url: urls,
    openFile: 'current',
    openPage: 'new',
    cache: true,
    limit: 10
  };
  return {
    reset: function() {
      return $localStorage.$reset(storageDefault);
    },
    storage: $localStorage.$default(storageDefault)
  };
}]).controller('SettingsCtrl', ["$scope", "$rootScope", "Settings", "$http", "sourcesUrl", "$filter", function($scope, $rootScope, Settings, $http, sourcesUrl, $filter) {
  var status;
  status = function() {
    return $scope.status = 'Please reload page';
  };
  $http.get(sourcesUrl).then(function(res) {
    return $scope.sources = res.data.filter($filter('hasYamlOrJson'));
  });
  $scope.addSource = function(source) {
    return $rootScope.settings.url = splitThenAdd($rootScope.settings.url, `/db/${source.path}`);
  };
  $scope.applyStyle = function() {
    injectCss($rootScope.settings.css);
  };
  $scope.style = function(name) {
    $rootScope.settings.css = `/styles/${name}.css`;
    return $scope.applyStyle();
  };
  $scope.reset = function() {
    Settings.reset();
    return status();
  };
  return $scope.clear = function() {
    $http.defaults.cache.destroy();
    return status();
  };
}]).controller('TagsCtrl', ["$scope", "$rootScope", function($scope, $rootScope) {
  var tags;
  tags = {};
  $rootScope.loadedLinks.map(function(i) {
    return i.tags;
  }).forEach(function(itags) {
    return itags.forEach(function(tag) {
      return tags[tag] = tags.hasOwnProperty(tag) ? tags[tag] + 1 : 1;
    });
  });
  $scope.getClass = getTagClass;
  return $scope.tags = tags;
}]).controller('TypeCtrl', ["$scope", "$routeParams", "$filter", function($scope, $routeParams, $filter) {
  return $scope.term = $filter('tagReplace')($routeParams.term);
}]).controller('ListCtrl', ["$scope", "$routeParams", "$filter", function($scope, $routeParams, $filter) {
  var engine, triggerChange;
  engine = null;
  triggerChange = function() {
    if ($scope.term.length > 0) {
      return $scope.change();
    }
  };
  $scope.$root.$watch('loadedLinks', function(nVal, oVal) {
    engine = getEngine($scope.$root.loadedLinks);
    return triggerChange();
  });
  $scope.searchResults = [];
  $scope.change = function() {
    if (engine) {
      return engine.search($scope.term.trim(), function(links) {
        return $scope.searchResults = links;
      });
    }
  };
  $scope.term = $filter('tagReplace')($routeParams.term);
  return triggerChange();
}]).config(["$routeProvider", function($routeProvider) {
  return $routeProvider.when('/type/:term?', {
    templateUrl: 'typeahead.html',
    controller: 'TypeCtrl'
  }).when('/list/:term?', {
    templateUrl: 'list.html',
    controller: 'ListCtrl'
  }).when('/tags', {
    templateUrl: 'tags.html'
  }).otherwise({
    redirectTo: '/type'
  });
}]).run(["$http", "$rootScope", "Settings", "CacheFactory", "LinksLoader", function($http, $rootScope, Settings, CacheFactory, LinksLoader) {
  $rootScope.settings = Settings.storage;
  if ($rootScope.settings.css !== null) {
    injectCss($rootScope.settings.css);
  }
  if ($rootScope.settings.cache === true) {
    $http.defaults.cache = CacheFactory('defaultCache', {
      maxAge: 15 * 60 * 1000,
      cacheFlushInterval: 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'localStorage'
    });
  }
  return LinksLoader.load().then(function(links) {
    console.log('Links are loaded:', links.length);
    return $rootScope.loadedLinks = links;
  });
}]);
