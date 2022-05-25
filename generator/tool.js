$("#sortable").sortable({
    change: function(){generateLinks();},
    update: function(){generateLinks();}
});
$("#sortable").disableSelection();

$("input").on("input", function(){
    generateLinks();
})

// default parameters
$("input[type=checkbox]").each(function() {
    $(this).prop("checked", true);
})
$("#no-background-input").prop("checked", false);
generateLinks();

function generateLinks() {
    var finalHTML = `
    <div id='shareLinks' style='display:flex;flex-direction:row;font-size: ${$("#scale-input").val()*16}px;'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    `;
    $(".socialmedia-checkbox").each(function() {
        if ($(this).is(":checked")) {
            finalHTML += generateLink($(this).attr('id'));
        }
    });
    finalHTML += `
    <style>
        .fa {
            text-decoration: none;
            color: ${$("#icon-color-input").val()};
            ${$("#no-background-input").is(":checked") ? "" : "background: " + $("#background-color-input").val() + ";"}
            border-radius: ${$("#border-radius-input").val()}%;
            padding: ${$("#padding-within-input").val()}px;
            padding-top: ${parseInt($("#padding-within-input").val()) + $("#scale-input").val()*3}px;
            padding-bottom: ${parseInt($("#padding-within-input").val()) - $("#scale-input").val()*3}px;
            margin: 0 ${$("#space-between-input").val()}px;
            width: ${$("#scale-input").val()*20}px;
            height: ${$("#scale-input").val()*20}px;
            text-align: center;
        }
        ${$("#hover-input").is(":checked") ? ".fa:hover{opacity: 0.5;}" : ""}
    </style>
    </div>
    `
    $("#preview").html(finalHTML);
    $("#embed").text(finalHTML);
}

function generateLink(social) {
    if (social == "CopyLink") {
        return (`
        <a class="fa fa-share" href="javascript:void(0);" onclick="copyUrlToClipboard()"></a>
        <script>
            function copyUrlToClipboard() {
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = window.location.href;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
                alert("Share link copied to clipboard!");
            }
        </script>
        `)
    }
    socialMap = {
        "Facebook" : ["https://www.facebook.com/sharer/sharer.php?u=", ""],
        "Twitter" : ["http://www.twitter.com/share?url=", ""],
        "LinkedIn" : ["https://www.linkedin.com/sharing/share-offsite/?url=", ""],
        "Pinterest" : ["http://pinterest.com/pin/create/link/?url=", ""],
    };
    return (`
    <a id="${social}-share-icon" class="fa fa-${social.toLowerCase()}" target="_blank"></a>
    <script>
        var curr = window.location.href;
        document.getElementById("${social}-share-icon").href = \`${socialMap[social][0]}\${curr}${socialMap[social][1]}\`;
    </script>
    `);
}