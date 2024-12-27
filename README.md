# [Revelation Project](https://revelation.biblicalblueprints.com/)

## Deploy

This site is deployed on merges to `master` using Cloudflare Pages.

## Local Dev

To run locally, first install Node.js and then run:

```bash
npm install
```

Then you will need to run setup:

```bash
npm run prep-build
npm run build-prod
```

All files will be built into the [public](/public) folder, so you can serve that with your tool of choice.

One way is to run:

```bash
npx http-server public
```

(Have a look at [http-server](https://www.npmjs.com/package/http-server) for options.)


## Mermaid Diagram of the Project
```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'background': '#ffffff' }}}%%
graph TB
    subgraph Client["Client Application"]
        subgraph Views["Views Layer"]
            Home["Home View"]:::view
            Structure["Structure View"]:::view
            Timeline["Timeline View"]:::view
            Sermons["Sermons View"]:::view
            DiffInt["Different Interpretations"]:::view
        end

        subgraph Components["Components Layer"]
            ExtLink["External Link"]:::component
            StateLink["State Link"]:::component
            VerseRange["Verse Range"]:::component
        end

        subgraph Services["Services Layer"]
            TitleService["Title Service"]:::service
        end

        subgraph Libraries["Library Layer"]
            StructUtils["Structure Utils"]:::lib
            TimelineUtils["Timeline Utils"]:::lib
            Visibility["Visibility System"]:::lib
            Hover["Hover System"]:::lib
        end
    end

    subgraph Build["Build & Deployment"]
        RollupConfig["Rollup Config"]:::build
        MinifyConfig["Minify Config"]:::build
        PublicDir["Public Directory"]:::build
        CloudflarePages["Cloudflare Pages"]:::deploy
    end

    subgraph Support["Supporting Services"]
        SermonCorrelator["Sermon Text and Audio Correlator"]:::support
        TimelineGenerator["Timeline JSON Generator"]:::support
    end

    subgraph Static["Static Assets"]
        SermonData["sermons.json"]:::data
        TimelineData["timeline-data.json"]:::data
        Styles["CSS Styles"]:::data
    end

    %% Relationships
    Views --> Components
    Components --> Services
    Services --> Libraries

    SermonCorrelator --> SermonData
    TimelineGenerator --> TimelineData

    RollupConfig --> PublicDir
    MinifyConfig --> PublicDir
    PublicDir --> CloudflarePages

    SermonData --> Sermons
    TimelineData --> Timeline

    %% Click Events
    click Home "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/view/home"
    click Structure "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/view/structure"
    click Timeline "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/view/timeline"
    click Sermons "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/view/sermons"
    click DiffInt "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/view/different-interpretations"
    click ExtLink "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/client/component/ExternalLink.html"
    click StateLink "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/client/component/StateLink.html"
    click VerseRange "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/client/component/VerseRange.html"
    click TitleService "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/client/service/title/title.js"
    click StructUtils "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/lib/structure"
    click TimelineUtils "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/lib/timeline"
    click Visibility "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/lib/efficient-visibility"
    click Hover "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/client/lib/hover"
    click RollupConfig "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/rollup.config.js"
    click MinifyConfig "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/rollup-minify.config.js"
    click SermonCorrelator "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/sermon-text-and-audio-correlater"
    click TimelineGenerator "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/timeline-json-generator"
    click SermonData "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/public/static/sermons.json"
    click TimelineData "https://github.com/KayserCommentaryOrg/revelation-project/blob/master/public/static/timeline-data.json"
    click Styles "https://github.com/KayserCommentaryOrg/revelation-project/tree/master/public/static/css"

    %% Styles
    classDef view fill:#4a90e2
    classDef component fill:#67c23a
    classDef lib fill:#409eff
    classDef service fill:#e6a23c
    classDef build fill:#f56c6c
    classDef deploy fill:#9254de
    classDef support fill:#ffd04b
    classDef data fill:#67c23a
```
