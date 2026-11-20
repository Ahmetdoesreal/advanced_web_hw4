```zsh
deniz@Ahmet-MacBook-Pro ~ % cd Advanced\ Web 
deniz@Ahmet-MacBook-Pro Advanced Web % cd hw4
deniz@Ahmet-MacBook-Pro hw4 % ls
advanced_web_hw4
Assignment_4_DestructuringFieldGuide.html
starter.zip
deniz@Ahmet-MacBook-Pro hw4 % cd advanced_web_hw4 
deniz@Ahmet-MacBook-Pro advanced_web_hw4 % cd starter 
deniz@Ahmet-MacBook-Pro starter % npm install

added 13 packages, and audited 14 packages in 28s

found 0 vulnerabilities
npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:
npm warn install-scripts   esbuild@0.28.2 (postinstall: node install.js)
npm warn install-scripts   fsevents@2.3.3 (install: (install scripts present))
npm warn install-scripts
npm warn install-scripts Run `npm install-scripts ls` to review, or `npm install-scripts approve <pkg>` to allow.
deniz@Ahmet-MacBook-Pro starter % npm run dev
npm error Missing script: "dev"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /Users/deniz/.npm/_logs/2026-11-20T06_51_27_536Z-debug-0.log
deniz@Ahmet-MacBook-Pro starter % npm install-scripts ls
2 packages have install scripts not yet covered by allowScripts:
  esbuild@0.28.2 (postinstall: node install.js)
  fsevents@2.3.3 (install: (install scripts present))

Run `npm install-scripts approve <pkg>` to allow, or `npm install-scripts deny <pkg>` to deny.
deniz@Ahmet-MacBook-Pro starter % npm install-scripts approve *
npm error code ENOMATCH
npm error No installed packages match: js, node_modules, package-lock.json, package.json, README.md, ts, tsconfig.json
npm error A complete log of this run can be found in: /Users/deniz/.npm/_logs/2026-11-20T06_52_00_333Z-debug-0.log
deniz@Ahmet-MacBook-Pro starter % npm install-scripts approve  
npm error code EUSAGE
npm error
npm error Manage install-script approvals for dependencies
npm error
npm error Usage:
npm error npm install-scripts approve <pkg> [<pkg> ...]
npm error npm install-scripts approve --all
npm error npm install-scripts deny <pkg> [<pkg> ...]
npm error npm install-scripts deny --all
npm error npm install-scripts ls
npm error npm install-scripts prune
npm error
npm error Options:
npm error [-a|--all] [--no-allow-scripts-pin] [--dry-run] [--json]
npm error
npm error   -a|--all
npm error     Show or act on all packages, not just the ones your project directly
npm error
npm error   --allow-scripts-pin
npm error     Write pinned (`pkg@version`) entries when approving install scripts.
npm error
npm error   --dry-run
npm error     Indicates that you don't want npm to make any changes and that it should
npm error
npm error   --json
npm error     Whether or not to output JSON data, rather than the normal output.
npm error
npm error
npm error Run "npm help install-scripts" for more info
npm error A complete log of this run can be found in: /Users/deniz/.npm/_logs/2026-11-20T06_52_02_609Z-debug-0.log
deniz@Ahmet-MacBook-Pro starter % npm install-scripts approve esbuild fsevents
Approved esbuild:
  added esbuild@0.28.2
Approved fsevents:
  added fsevents@2.3.3
deniz@Ahmet-MacBook-Pro starter % npm install

up to date, audited 14 packages in 1s

found 0 vulnerabilities
deniz@Ahmet-MacBook-Pro starter % npm run dev
npm error Missing script: "dev"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /Users/deniz/.npm/_logs/2026-11-20T06_52_30_284Z-debug-0.log
```
