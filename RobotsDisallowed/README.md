# RobotsDisallowed

The RobotsDisallowed project is a harvest of the robots.txt disallowed directories of the world's top websites---specifically those of the Alexa 100K and the Majestic 100K.

This list of Disallowed directories is a great way to supplement content discovery during a web security assessment or bug bounty, since the website owner is basically saying, 

> "Don't go here; there's sensitive stuff in there!

In other words, it's a list of potential high-value targets.

## The project

So what we did is take the Alexa Top 100,000 websites, download their robots.txt files, extracted all Disallowed directories, and then performed a bunch of cleanup on them (they are a mess) to make the lists as useful as possible during web assessments.

### History and updates

- This project was initially created in 2017, and used the Alexa 100K.
- This project was last updated in March of 2019, and used the Majestic Million top 100K. In addition to using the Majestic list instead of Alexa (Alexa went to a pay model), we also switched to Chromium as the user-agent (instead of curl), simplified the file structure, and created an /archive directory so that older versions of the files can persist. The old code directory is also in there. Finally, we removed the actual robots.txt files because…well, they're big and worthless.

## How to use the project

1. Clone the directory to your system.
2. Pick the file you want to use based on the assessment you're doing. If you have lots of time, maybe use one of the bigger top-*N* lists---vs. using a smaller one if you have less time.

*My personal favorite option, however, is to go with the ``curated.txt`` list, because it's only around 500 items, and it is a collection of directories containing the following strings and content:*

- "admin"
- "user"
- "account"
- "password"
- "forgot"
- "login"
- "backup"
- The top 25 entries from the full list

In short, it's the best of the best. I blogged more about [here](https://wahyu9kdl.github.io).

**TL;DR**: If you want the best use of your time, go with ``curated.txt``.

## Credit

This concept is not new. The RAFT project was the first to do this, and we thank them for their pioneering of the idea. But the project is now dead and gone, and since the idea works best when it's kept up-to-date, we decided to give it a refresh in the form of RobotsDisallowed.

## Shoutouts

Thanks so much to [Awfanspage](https://twitter.com/Awfanspage)  and [Tim Awdev](https://twitter.com/Awfanspage) for talking about the project on Twitter and in their bounty/recon/hacking presentations around the world.

## Feedback

If you have any ideas on what to improve, please email us at github@awdev.com or submit a pull request.

Thank you, and happy hacking!


## Installation

HTTP/HTTPS 
```
https://github.com/wahyu9kdl/link.git
```
SSH
```
git@github.com:wahyu9kdl/link.git
```
GITHUB CLI
```
gh repo clone wahyu9kdl/link
```
DOWNLOAD ZIP
```
https://github.com/wahyu9kdl/link/archive/refs/heads/main.zip
```


# Free HTTP Proxy List 🌍

[![Hourly Update](https://github.com/mertguvencli/http-proxy-list/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/mertguvencli/http-proxy-list/actions/workflows/main.yml)
![GitHub](https://img.shields.io/github/license/mertguvencli/http-proxy-list)
![GitHub last commit](https://img.shields.io/github/last-commit/mertguvencli/http-proxy-list)

It is a lightweight project that hourly scrapes lots of free-proxy sites, validates if it works, and serves a clean proxy list.


> Scraper found **3541** proxies at the latest update. Usable proxies are below.

## Usage

Click the file format that you want and copy the URL.


|File|Content|Count|
|----|-------|-----|
|[data.txt](https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt)|`ip_address:port` combined (seperated new line)|104|
|[data.json](https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.json)|`ip, port`|104|
|[data-with-geolocation.json](https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data-with-geolocation.json)|`ip, port, geolocation`|104|

## Sources

|Source|Found Proxies|Succeed|
|------|-------------|-------|
|[free-proxy-list.net](https://free-proxy-list.net)|300|✅|
|[us-proxy.org](https://www.us-proxy.org)|200|✅|
|[proxydb.net](http://proxydb.net)|15|✅|
|[free-proxy-list.com](https://free-proxy-list.com/?page=&port=&type%5B%5D=http&type%5B%5D=https&up_time=0&search=Search)|10|✅|
|[proxy-list.download](https://www.proxy-list.download/HTTP)|26|✅|
|[vpnoverview.com](https://vpnoverview.com/privacy/anonymous-browsing/free-proxy-servers)|32|✅|
|[proxyscan.io](https://www.proxyscan.io)|69|✅|
|[proxylist.geonode.com](https://proxylist.geonode.com/api/proxy-list?limit=300&page=1&sort_by=lastChecked&sort_type=desc&protocols=http,https)|300|✅|
|[proxyscrape.com](https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all)|226|✅|
|[github.com/clarketm/proxy-list](https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt)|400|✅|
|[github.com/monosans/proxy-list](https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt)|86|✅|
|[github.com/TheSpeedX/PROXY-List](https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt)|1877|✅|


## Sample Proxies With Geolocation Info

|#|Ip|Port|Country|City|Internet Service Provider|
|-|--|----|-------|----|-------------------------|
|1|157.100.12.138|999|Ecuador|Quito|Telconet S.A|
|2|103.245.204.214|8080|Bangladesh|Azimpur|Next Online Ltd.|
|3|122.155.165.191|3128|Thailand|Ratchathewi|CAT Telecom Public Company Limited|
|4|47.252.4.64|8888|United States|Charlottesville|Alibaba.com LLC|
|5|45.167.125.209|9992|Colombia|Popayán|Sepcom Comunicaciones SAS|
|6|157.100.12.138|999|Ecuador|Quito|Telconet S.A|
|7|192.99.38.64|1081|Canada|Beauharnois|OVH SAS|
|8|122.155.165.191|3128|Thailand|Ratchathewi|CAT Telecom Public Company Limited|
|9|190.60.36.254|999|Colombia|Cartagena|IFX NETWORKS COLOMBIA|
|10|222.216.37.138|808|China|Nanning|Chinanet|
|11|203.202.255.67|8080|Bangladesh|Dhaka|Aamra Networks Limited|
|12|122.155.165.191|3128|Thailand|Ratchathewi|CAT Telecom Public Company Limited|
|13|103.6.90.106|9812|India|Jaipur|DNS Infonet Pvt Ltd|
|14|119.252.171.50|8080|Indonesia|Jakarta|PT Indonesia Comnets Plus|
|15|114.235.122.242|8901|China|Qinnan|Chinanet|
|16|37.120.192.154|8080|Netherlands|Amsterdam|M247 Ltd|
|17|47.252.4.64|8888|United States|Charlottesville|Alibaba.com LLC|
|18|52.45.107.168|80|United States|Ashburn|Amazon.com, Inc.|
|19|192.99.38.64|1081|Canada|Beauharnois|OVH SAS|
|20|65.108.136.229|9090|Finland|Helsinki|Hetzner Online GmbH|



## Contributing

Contributions are welcome, and they are greatly appreciated! Every
little bit helps, and credit will always be given.



## Support the Project

There are a few things you can do to support the project:

- Star the repository and follow me on GitHub
- Share and upvote on sites like Twitter, Reddit, and Hacker News
- Report any bugs, glitches, or errors that you find
- Translate into other languages

These things motivate me to to keep sharing what I build, and they provide
validation that my work is appreciated! They also help me improve the project.
Thanks in advance!

If you are insistent on spending money to show your support, I encourage you to
instead make a generous donation to one of the following organizations. By
advocating for Internet freedoms, organizations like these help me to feel
comfortable releasing work publicly on the Web.

<p align="center">
<i>Loved the tool? Please consider <a href="https://www.paypal.com/signin?returnUri=https%3A%2F%2Fwww.paypal.com%2Fmyaccount%2Ftransfer%2Fhomepage%2Fexternal%2Fprofile%3FflowContextData%3DdnQz6co9bTO3dXsoaSQoXrylmBBr7Z4w4NgW64GB_WDfmLR52ffZouE7E54etjPgewijP0OxmZksVyVuBbZSxh7v9r8PWndQTi1eJUMZCCj7rrJftUv11NTxekLdOnVJT8vh6pE128RXl6Lq4yOTwu0f2kutdDCQ_qZkx2CTsh1Z3f_OGWFAvKJiKVMHbhq3dn4SWoaIs2dY-I1dSekSdPbZuEHLmCfV3kIA3MpjsPC9xVmmiRxgIY0fsKhMIEnZZQdCZUSJTpNWAnvYDIc-pUIdstyJJzGtqMk0TeqjSG7LnM5jOZufDLI4W8Jbk14B1O-3rAfdL66TgrgjcVRK35l6WhQzVDZEWvimVxtUMuqCgf8gboCEKwLD3ywxApHbM23LBMJY9KBXh6ILB3oZCmB0wYYJxSwmpLiIEW%26amount%3D25%26currencyCode%3DAUD&onboardData=%7B%22country.x%22%3A%22ID%22%2C%22locale.x%22%3A%22id_ID%22%2C%22intent%22%3A%22paypalme%22%2C%22redirect_url%22%3A%22https%253A%252F%252Fwww.paypal.com%252Fmyaccount%252Ftransfer%252Fhomepage%252Fexternal%252Fprofile%253FflowContextData%253DdnQz6co9bTO3dXsoaSQoXrylmBBr7Z4w4NgW64GB_WDfmLR52ffZouE7E54etjPgewijP0OxmZksVyVuBbZSxh7v9r8PWndQTi1eJUMZCCj7rrJftUv11NTxekLdOnVJT8vh6pE128RXl6Lq4yOTwu0f2kutdDCQ_qZkx2CTsh1Z3f_OGWFAvKJiKVMHbhq3dn4SWoaIs2dY-I1dSekSdPbZuEHLmCfV3kIA3MpjsPC9xVmmiRxgIY0fsKhMIEnZZQdCZUSJTpNWAnvYDIc-pUIdstyJJzGtqMk0TeqjSG7LnM5jOZufDLI4W8Jbk14B1O-3rAfdL66TgrgjcVRK35l6WhQzVDZEWvimVxtUMuqCgf8gboCEKwLD3ywxApHbM23LBMJY9KBXh6ILB3oZCmB0wYYJxSwmpLiIEW%2526amount%253D25%2526currencyCode%253DAUD%22%2C%22sendMoneyText%22%3A%22Anda%2520mengirimkan%2520Ahmad%2520wahyudi%22%7D">donating</a>  💸 to help it improve!</i>
</p>
<a href="https://www.paypal.com/signin?returnUri=https%3A%2F%2Fwww.paypal.com%2Fmyaccount%2Ftransfer%2Fhomepage%2Fexternal%2Fprofile%3FflowContextData%3DdnQz6co9bTO3dXsoaSQoXrylmBBr7Z4w4NgW64GB_WDfmLR52ffZouE7E54etjPgewijP0OxmZksVyVuBbZSxh7v9r8PWndQTi1eJUMZCCj7rrJftUv11NTxekLdOnVJT8vh6pE128RXl6Lq4yOTwu0f2kutdDCQ_qZkx2CTsh1Z3f_OGWFAvKJiKVMHbhq3dn4SWoaIs2dY-I1dSekSdPbZuEHLmCfV3kIA3MpjsPC9xVmmiRxgIY0fsKhMIEnZZQdCZUSJTpNWAnvYDIc-pUIdstyJJzGtqMk0TeqjSG7LnM5jOZufDLI4W8Jbk14B1O-3rAfdL66TgrgjcVRK35l6WhQzVDZEWvimVxtUMuqCgf8gboCEKwLD3ywxApHbM23LBMJY9KBXh6ILB3oZCmB0wYYJxSwmpLiIEW%26amount%3D25%26currencyCode%3DAUD&onboardData=%7B%22country.x%22%3A%22ID%22%2C%22locale.x%22%3A%22id_ID%22%2C%22intent%22%3A%22paypalme%22%2C%22redirect_url%22%3A%22https%253A%252F%252Fwww.paypal.com%252Fmyaccount%252Ftransfer%252Fhomepage%252Fexternal%252Fprofile%253FflowContextData%253DdnQz6co9bTO3dXsoaSQoXrylmBBr7Z4w4NgW64GB_WDfmLR52ffZouE7E54etjPgewijP0OxmZksVyVuBbZSxh7v9r8PWndQTi1eJUMZCCj7rrJftUv11NTxekLdOnVJT8vh6pE128RXl6Lq4yOTwu0f2kutdDCQ_qZkx2CTsh1Z3f_OGWFAvKJiKVMHbhq3dn4SWoaIs2dY-I1dSekSdPbZuEHLmCfV3kIA3MpjsPC9xVmmiRxgIY0fsKhMIEnZZQdCZUSJTpNWAnvYDIc-pUIdstyJJzGtqMk0TeqjSG7LnM5jOZufDLI4W8Jbk14B1O-3rAfdL66TgrgjcVRK35l6WhQzVDZEWvimVxtUMuqCgf8gboCEKwLD3ywxApHbM23LBMJY9KBXh6ILB3oZCmB0wYYJxSwmpLiIEW%2526amount%253D25%2526currencyCode%253DAUD%22%2C%22sendMoneyText%22%3A%22Anda%2520mengirimkan%2520Ahmad%2520wahyudi%22%7D"/><img align="center"  src="https://img.shields.io/badge/support-PayPal-blue?logo=PayPal&style=flat-square&label=Donate" alt="sponsor github profile readme generator"/>
</a>  
<a href="https://trakteer.id/awfanspage/tip "><img align="center" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="30" width="100" alt="Support" /></a>
<a href="https://ko-fi.com/Awfanspage"><img align="center" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="30" width="100" alt="Awfanspage" /></a>
</p>
