// i18n.js - Internationalization (i18n) dictionaries for the assessment tool.
//
// Structure:
//   translations.<locale>.ui            -> static UI chrome strings (index.html + app.js)
//   translations.<locale>.objectives    -> objective name/description overrides (keyed by objective id)
//   translations.<locale>.sealLevels    -> SEAL level name/description overrides (keyed by level)
//   translations.<locale>.questions     -> question text/help/answer-label overrides (keyed by question id)
//
// English (en) only defines `ui`: the framework content in questions.js is already
// English and acts as the fallback source of truth. Add a new locale by copying the
// `sv` block and translating; any missing key falls back to English.
//
// NOTE: the object literal below is strict JSON - keep it that way (double quotes,
// no trailing commas, no comments inside) so it can be validated mechanically.

const translations = {
  "en": {
    "locale": "en",
    "name": "English",
    "ui": {
      "docTitle": "EU Cloud Sovereignty Assessment Tool",
      "headerTitle": "EU Cloud Sovereignty Framework",
      "headerSubtitle": "Assessment Tool v3.0.0",
      "headerFrameworkVersion": "Aligned with the EU Cloud Sovereignty Framework (v1.2.1) and the official Implementation Guidance & Sovereignty Assessment Calculator (1 June 2026)",
      "languageLabel": "Language",
      "welcomeTitle": "Welcome to the Cloud Sovereignty Assessment",
      "welcomeIntro": "This interactive tool helps organizations assess their cloud infrastructure's compliance with EU sovereignty requirements through a comprehensive questionnaire covering <strong>8 key sovereignty objectives</strong>.",
      "beginAssessment": "Begin Assessment",
      "infoCriteriaTitle": "48 Criteria",
      "infoCriteriaText": "The official assessment criteria across all 8 objectives",
      "infoTimeTitle": "10-15 Minutes",
      "infoTimeText": "Estimated completion time",
      "infoScoreTitle": "Score + SEAL",
      "infoScoreText": "A weighted Sovereignty Score and a SEAL level (0–4)",
      "methodNote": "<strong>How it scores (official methodology):</strong> the <em>Sovereignty Score</em> is the weighted average of the 8 objective scores, while the <em>SEAL level</em> is the <strong>lowest</strong> SEAL achieved on any single criterion (a weakest-link measure). A high score does not guarantee a high SEAL.",
      "objectivesOverviewTitle": "The 8 Sovereignty Objectives",
      "progressText": "Question {current} of {total}",
      "criterionLabel": "{code} · Criterion {number}",
      "helpToggleAria": "How to answer this question",
      "prevButton": "Previous",
      "nextButton": "Next",
      "viewResults": "View Results",
      "resultsTitle": "Assessment Results",
      "sovScoreLabel": "Sovereignty Score",
      "sealLabel": "SEAL — weakest link across all criteria",
      "sovScoreDetail": "Weighted sovereignty score · {score} / 1000",
      "breakdownTitle": "Breakdown by Objective",
      "breakdownWeight": "weight {weight}%",
      "recommendationsTitle": "Priorities for Improvement",
      "recTopIntro": "Outstanding — every criterion already reaches <strong>{sealCode} ({sealName})</strong>, the highest SEAL. The only remaining work is lifting any objective below 100% to raise the Sovereignty Score.",
      "recIntro": "Your overall SEAL is <strong>{sealCode}</strong>, set by the lowest-scoring criteria below. Because SEAL is a weakest-link measure, raising it requires improving <em>every</em> criterion currently at {sealCode}.",
      "recBindingItem": "<strong>{code} · Criterion {number}</strong> (currently {sealCode}): {text} <em>— your answer: \"{answer}\".</em>",
      "recWeakTitle": "Objectives dragging down the Sovereignty Score (below 75%):",
      "recWeakItem": "{code} {name}: {percentage}% (weight {weight}%)",
      "downloadReportBtn": "Download Report",
      "restartBtn": "Start New Assessment",
      "footerDisclaimer": "<strong>Disclaimer:</strong> This tool is for informational and self-assessment purposes only. It does not constitute legal advice or official EU certification.",
      "footerGitHub": "View on GitHub",
      "footerFramework": "EU Framework",
      "footerGuidance": "Implementation Guidance (June 2026)",
      "reportTitle": "EU CLOUD SOVEREIGNTY FRAMEWORK ASSESSMENT",
      "reportDateLabel": "Assessment Date",
      "reportIdLabel": "Assessment ID",
      "reportMethodologyLabel": "Methodology",
      "reportResultsHeader": "RESULTS",
      "reportScoreLabel": "Sovereignty Score",
      "reportSealLabel": "SEAL (weakest link)",
      "reportSealNote": "The SEAL level is the LOWEST SEAL achieved on any single criterion. The Sovereignty Score is the weighted average of the eight objective scores.",
      "reportBreakdownHeader": "SCORE BREAKDOWN BY OBJECTIVE",
      "reportWeightLabel": "weight",
      "reportObjectiveSealLabel": "objective SEAL",
      "reportBindingHeader": "BINDING CRITERIA (currently capping the overall SEAL)",
      "reportCriterionWord": "Criterion",
      "reportYourAnswerLabel": "Your answer",
      "reportReferenceLabel": "Reference",
      "reportDisclaimer": "This tool is provided for informational and self-assessment purposes only. It does not constitute legal advice or official EU certification. Point values are reference figures that contracting authorities may adapt."
    }
  },
  "sv": {
    "locale": "sv",
    "name": "Svenska",
    "ui": {
      "docTitle": "EU:s verktyg för bedömning av molnsuveränitet",
      "headerTitle": "EU:s ramverk för molnsuveränitet",
      "headerSubtitle": "Bedömningsverktyg v3.0.0",
      "headerFrameworkVersion": "I linje med EU:s ramverk för molnsuveränitet (v1.2.1) och den officiella vägledningen för genomförande samt kalkylatorn för suveränitetsbedömning (1 juni 2026)",
      "languageLabel": "Språk",
      "welcomeTitle": "Välkommen till bedömningen av molnsuveränitet",
      "welcomeIntro": "Det här interaktiva verktyget hjälper organisationer att bedöma sin molninfrastrukturs efterlevnad av EU:s suveränitetskrav genom ett omfattande frågeformulär som täcker <strong>8 centrala suveränitetsmål</strong>.",
      "beginAssessment": "Starta bedömningen",
      "infoCriteriaTitle": "48 kriterier",
      "infoCriteriaText": "De officiella bedömningskriterierna för alla 8 mål",
      "infoTimeTitle": "10–15 minuter",
      "infoTimeText": "Uppskattad tid att färdigställa",
      "infoScoreTitle": "Poäng + SEAL",
      "infoScoreText": "En viktad suveränitetspoäng och en SEAL-nivå (0–4)",
      "methodNote": "<strong>Så fungerar poängsättningen (officiell metodik):</strong> <em>suveränitetspoängen</em> är det viktade medelvärdet av de 8 målens poäng, medan <em>SEAL-nivån</em> är den <strong>lägsta</strong> SEAL som uppnås på något enskilt kriterium (ett svagaste-länken-mått). En hög poäng garanterar inte en hög SEAL.",
      "objectivesOverviewTitle": "De 8 suveränitetsmålen",
      "progressText": "Fråga {current} av {total}",
      "criterionLabel": "{code} · Kriterium {number}",
      "helpToggleAria": "Så besvarar du denna fråga",
      "prevButton": "Föregående",
      "nextButton": "Nästa",
      "viewResults": "Visa resultat",
      "resultsTitle": "Bedömningsresultat",
      "sovScoreLabel": "Suveränitetspoäng",
      "sealLabel": "SEAL — svagaste länken över alla kriterier",
      "sovScoreDetail": "Viktad suveränitetspoäng · {score} / 1000",
      "breakdownTitle": "Uppdelning per mål",
      "breakdownWeight": "vikt {weight} %",
      "recommendationsTitle": "Prioriteringar för förbättring",
      "recTopIntro": "Utmärkt — varje kriterium når redan <strong>{sealCode} ({sealName})</strong>, den högsta SEAL-nivån. Det enda återstående arbetet är att höja mål under 100 % för att höja suveränitetspoängen.",
      "recIntro": "Din övergripande SEAL är <strong>{sealCode}</strong>, satt av de lägst poängsatta kriterierna nedan. Eftersom SEAL är ett svagaste-länken-mått krävs att <em>alla</em> kriterier som för närvarande ligger på {sealCode} förbättras för att höja den.",
      "recBindingItem": "<strong>{code} · Kriterium {number}</strong> (för närvarande {sealCode}): {text} <em>— ditt svar: \"{answer}\".</em>",
      "recWeakTitle": "Mål som drar ner suveränitetspoängen (under 75 %):",
      "recWeakItem": "{code} {name}: {percentage} % (vikt {weight} %)",
      "downloadReportBtn": "Ladda ner rapport",
      "restartBtn": "Starta ny bedömning",
      "footerDisclaimer": "<strong>Ansvarsfriskrivning:</strong> Detta verktyg är endast avsett för informations- och självbedömningsändamål. Det utgör inte juridisk rådgivning eller officiell EU-certifiering.",
      "footerGitHub": "Visa på GitHub",
      "footerFramework": "EU-ramverket",
      "footerGuidance": "Vägledning för genomförande (juni 2026)",
      "reportTitle": "BEDÖMNING INOM EU:S RAMVERK FÖR MOLNSOVERÄNITET",
      "reportDateLabel": "Bedömningsdatum",
      "reportIdLabel": "Bedömnings-ID",
      "reportMethodologyLabel": "Metodik",
      "reportResultsHeader": "RESULTAT",
      "reportScoreLabel": "Suveränitetspoäng",
      "reportSealLabel": "SEAL (svagaste länken)",
      "reportSealNote": "SEAL-nivån är den LÄGSTA SEAL som uppnås på något enskilt kriterium. Suveränitetspoängen är det viktade medelvärdet av de åtta målens poäng.",
      "reportBreakdownHeader": "POÄNGUPPDELNING PER MÅL",
      "reportWeightLabel": "vikt",
      "reportObjectiveSealLabel": "målets SEAL",
      "reportBindingHeader": "BINDANDE KRITERIER (begränsar för närvarande den övergripande SEAL-nivån)",
      "reportCriterionWord": "Kriterium",
      "reportYourAnswerLabel": "Ditt svar",
      "reportReferenceLabel": "Referens",
      "reportDisclaimer": "Detta verktyg tillhandahålls endast för informations- och självbedömningsändamål. Det utgör inte juridisk rådgivning eller officiell EU-certifiering. Poängvärdena är referensvärden som upphandlande myndigheter får anpassa."
    },
    "sealLevels": {
      "0": {
        "name": "Ingen suveränitet",
        "description": "Tjänst, teknik eller verksamhet under exklusiv kontroll av icke-EU tredje parter, helt styrd av icke-EU jurisdiktioner."
      },
      "1": {
        "name": "Jurisdiktionssuveränitet",
        "description": "EU-rätt gäller formellt men med begränsad praktisk verkställbarhet; tjänst, teknik eller verksamhet under exklusiv kontroll av icke-EU tredje parter."
      },
      "2": {
        "name": "Datasuveränitet",
        "description": "EU-jurisdiktioner gäller, men väsentliga beroenden av icke-EU kvarstår; tjänst, teknik eller verksamhet under indirekt kontroll av icke-EU tredje parter."
      },
      "3": {
        "name": "Teknisk suveränitet",
        "description": "EU-jurisdiktioner gäller, EU-aktörer utövar betydande men inte fullt inflytande; tjänst, teknik eller verksamhet under marginell kontroll av icke-EU tredje parter."
      },
      "4": {
        "name": "Full digital suveränitet",
        "description": "Teknik och verksamhet under fullständig EU-kontroll, enbart under EU-jurisdiktion, utan kritiska beroenden av icke-EU."
      }
    },
    "objectives": {
      "strategic": {
        "name": "Strategisk suveränitet",
        "description": "Strategisk suveränitet fångar i vilken grad en molnleverantör (eller teknikaktör) är förankrad i Europeiska unionens/EES rättsliga, finansiella och industriella ekosystem. Den bedömer ägandets stabilitet, styrningsinflytande och anpassning till EU:s strategiska prioriteringar."
      },
      "legal": {
        "name": "Juridisk och jurisdiktionssuveränitet",
        "description": "Juridisk och jurisdiktionssuveränitet utvärderar den rättsliga miljön, exponeringen för främmande myndigheter och verkställbarheten hos de rättigheter som styr en teknikleverantör och dess tjänster. Den avgör i vilken utsträckning en leverantör är förankrad i europeisk jurisdiktion och skyddad från externa rättsliga anspråk."
      },
      "data_control": {
        "name": "Data- och AI-suveränitet",
        "description": "Data- och AI-suveränitet fokuserar på skydd, kontroll och oberoende för data och AI-tjänster inom EU/EES. Den behandlar hur data säkras, var de behandlas och i vilken grad kunderna behåller autonomi över AI-förmågor."
      },
      "operational": {
        "name": "Operativ suveränitet",
        "description": "Operativ suveränitet mäter den praktiska förmågan hos EU-aktörer att driva, stödja och utveckla en teknik oberoende av utländsk kontroll. Den fokuserar på kontinuitet i verksamheten, tillgång till kompetens och motståndskraft mot externa beroenden."
      },
      "supply_chain": {
        "name": "Suveränitet i leveranskedjan",
        "description": "Suveränitet i leveranskedjan utvärderar geografiskt ursprung, transparens och motståndskraft i teknikens leveranskedja, med fokus på i vilken utsträckning kritiska komponenter och processer förblir under EU-kontroll eller exponeras för beroenden av icke-EU."
      },
      "technology": {
        "name": "Teknologisk suveränitet",
        "description": "Teknologisk suveränitet utvärderar graden av öppenhet, transparens och oberoende i den underliggande tekniska stacken, så att EU-aktörer kan samverka, granska och utveckla lösningar utan inlåsning i utländska proprietära system."
      },
      "security": {
        "name": "Säkerhets- och efterlevnadssuveränitet",
        "description": "Säkerhets- och efterlevnadssuveränitet mäter i vilken utsträckning säkerhetsverksamhet, efterlevnadsskyldigheter och motståndskraftsåtgärder kontrolleras inom EU, vilket säkerställer oberoende från främmande jurisdiktioner och långsiktig operativ trygghet."
      },
      "sustainability": {
        "name": "Miljömässig hållbarhet",
        "description": "Miljömässig hållbarhet bedömer molntjänsters långsiktiga autonomi och motståndskraft i förhållande till energianvändning, beroende och råvarubrist."
      }
    },
    "questions": {
      "sov-1-q1": {
        "text": "Kontroll av EU/EES-rättslig enhet – säkerställer att den yttersta beslutanderätten ligger inom EU:s jurisdiktion.",
        "help": "Bedömer var den yttersta beslutanderätten över leverantören juridiskt ligger – den kontrollerande enhetens och dess slutliga ägares jurisdiktion, inte var enskilda anställda eller aktieägare råkar bo. ”Helt inom EU” innebär att den juridiska enheten och den som ytterst kontrollerar den båda står under EU/EES-jurisdiktion, utan att någon icke-EU-part kan styra strategiska beslut.",
        "answers": [
          "1. Helt utanför EU",
          "2. Huvudsakligen utanför EU",
          "3. Huvudsakligen inom EU",
          "4. Helt inom EU"
        ]
      },
      "sov-1-q2": {
        "text": "Risk för ägarbyte (Change of Control) – bedömning av sannolikheten för övertagande eller överlåtelse till icke-suveräna ägare",
        "help": "Hur sannolikt det är att leverantören kan köpas upp av eller överlåtas till en ägare utanför EU/EES kontroll (utländskt övertagande, försäljning av majoritetsandel, moderbolagsbyte). Bedöm realistiskt utifrån ägar- och investerarstrukturen och eventuella kontrollskydd (t.ex. gyllene aktier); ”Mycket osannolikt” innebär varaktiga skydd mot ett icke-EU-övertagande.",
        "answers": [
          "1. Mycket sannolikt",
          "2. Sannolikt övertagande eller överlåtelse till en icke-EU suverän enhet",
          "3. Någorlunda sannolikt övertagande eller överlåtelse till en icke-EU suverän enhet",
          "4. Osannolikt övertagande eller överlåtelse till en icke-EU suverän enhet",
          "5. Mycket osannolikt"
        ]
      },
      "sov-1-q3": {
        "text": "Kontroll över vägkartan (roadmap) – mäter EU-intressenters förmåga att påverka leverantörens tekniska utveckling och tjänsteutveckling.",
        "help": "I vilken mån EU-intressenter kan påverka produkt-/tjänsteroadmapen – från ingen påverkan alls, via offentliga feedbackkanaler, till formella styrningsorgan med EU-deltagande, upp till att EU-aktörer har avgörande inflytande.",
        "answers": [
          "1. Ingen påverkan möjlig",
          "2. Via offentliga ”voice of the customer”-kanaler (t.ex. feedbackportaler, onlinecommunities)",
          "3. Styrningsorgan finns med EU-aktörers deltagande",
          "4. Fullt inflytande för EU-aktörer"
        ]
      },
      "sov-1-q4": {
        "text": "Finansiellt oberoende av icke-EU-kapital – i vilken grad leverantören förlitar sig på EU-baserad finansiering snarare än externt kapital.",
        "help": "I vilken utsträckning leverantören finansieras av EU-baserat kapital snarare än av icke-EU investerare eller långivare. Beakta ursprunget för aktiekapital, riskkapital och skulder, inte bara var ett bankkonto finns.",
        "answers": [
          "1. Nästan helt beroende av icke-EU-finansiering",
          "2. Huvudsakligen beroende av icke-EU-finansiering",
          "3. Balanserad blandning av EU- och icke-EU-finansiering",
          "4. Majoriteten av finansieringen är EU-baserad",
          "5. Helt EU-baserad finansiering"
        ]
      },
      "sov-1-q5": {
        "text": "Ekonomiskt bidrag till EU – omfattningen av investeringar, arbetstillfällen och värdeskapande inom EU/EES.",
        "help": "Omfattning av investeringar, arbetstillfällen och värdeskapande som stannar inom EU/EES (FoU, löner, skatter, anläggningar). ”Helt i EU” innebär att väsentligen allt ekonomiskt värde genereras och behålls inom EU.",
        "answers": [
          "1. Minimalt",
          "2. Visst",
          "3. Balanserat EU/icke-EU",
          "4. Majoriteten i EU",
          "5. Helt i EU"
        ]
      },
      "sov-1-q6": {
        "text": "Deltagande i EU:s strategiska program – medverkan i initiativ som IPCEI-CIS, Horisont Europa eller Gaia-X.",
        "help": "Aktivt, strukturellt deltagande i EU:s strategiska initiativ som IPCEI-CIS, Horisont Europa eller Gaia-X – djupare deltagande ger högre poäng än nominellt medlemskap.",
        "answers": [
          "Inget tydligt deltagande",
          "Minimalt deltagande",
          "Aktiv deltagare i strategiska projekt",
          "Betydande deltagande",
          "Strategiska projekt är beroende av uppdragstagarens deltagande"
        ]
      },
      "sov-1-q7": {
        "text": "Anpassning till EU:s industristrategier – överensstämmelse med digitala, gröna och industriella suveränitetsmål som fastställts på EU-nivå.",
        "help": "Överensstämmelse med EU:s mål för digital, grön och industriell suveränitet, styrkt av konkreta planer, mätbara resultat och dedikerad styrning – inte enbart uttalade intentioner.",
        "answers": [
          "Inga bevis finns",
          "Finns handlingsplan (hur mäter man ambitionsnivån? Genom medel kopplade till målen? I förhållande till företagets storlek?)",
          "Redan mätbara resultat och befintlig dedikerad styrning",
          "Djärv ambition och dedikerade medel"
        ]
      },
      "sov-1-q8": {
        "text": "Motståndskraft vid avbrott (cut-off) – förmåga att upprätthålla säker drift även om leverantörsstöd dras in eller störs.",
        "help": "Om tjänsten skulle kunna fortsätta köras säkert om en (typiskt icke-EU) leverantör drog in sitt stöd eller stördes: från omedelbar avstängning, via avtalsenlig kontinuitet, till full autonomi eller förmåga att byta leverantör eller internalisera nyckelfunktioner.",
        "answers": [
          "1. Omedelbar avstängning av tjänsten förväntas",
          "2. Tjänsten skulle troligen stoppas men med viss fördröjning för att ge kunden tid att reagera",
          "3. Kan fortsätta tillfälligt enligt avtal med kommissionen (EC)",
          "4. Förmåga att hitta alternativa leverantörer eller internalisera nyckelfunktioner",
          "5. Full autonomi och kontinuitet"
        ]
      },
      "sov-2-q1": {
        "text": "Primär rättsordning (jurisdiktion) – det nationella rättssystem som styr leverantörens verksamhet och avtal.",
        "help": "Vilket rättssystem som faktiskt styr enheten som levererar tjänsten och dess avtal. ”Enbart EU-rätt” innebär att verksamhet och avtal enbart styrs av EU-/medlemsstatsrätt, utan någon styrande icke-EU-rätt.",
        "answers": [
          "1. Enbart icke-EU",
          "2. Blandad EU/icke-EU",
          "3. Enbart EU-rätt"
        ]
      },
      "sov-2-q2": {
        "text": "Extraterritoriella lagar – graden av exponering för icke-EU-lagar med gränsöverskridande räckvidd (alla).",
        "help": "Exponering för icke-EU-lagar med gränsöverskridande räckvidd (t.ex. US CLOUD Act, FISA 702, Kinas cybersäkerhetslag) som skulle kunna tvinga leverantören oavsett EU-rätt. Högre nivåer kräver strukturell isolering (EU-kontrollerad enhet, verifierad rättslig immunitet), inte bara avtalsklausuler.",
        "answers": [
          "Fullt exponerad för icke-EU-lagar",
          "Åtgärdsklausuler finns, exponeringen kvarstår",
          "EU-dotterbolag med avtalsmässiga skydd",
          "Rättsliga strukturer som skyddar mot utländsk rätt",
          "Verifierad rättslig immunitet, icke-EU-lagar kan inte verkställas"
        ]
      },
      "sov-2-q3": {
        "text": "Vägar till dataåtkomst – förekomst av rättsliga, avtalsmässiga eller tekniska kanaler genom vilka icke-EU-myndigheter skulle kunna tvinga fram åtkomst till data eller system.",
        "help": "Om rättsliga, avtalsmässiga eller tekniska kanaler låter icke-EU-myndigheter tvinga fram åtkomst till data eller system, och om kunderna skulle underrättas. Bäst: sådana förfrågningar avvisas alltid av leverantören.",
        "answers": [
          "1. Icke-EU-myndigheter kan tvinga fram åtkomst till data eller system utan att kunderna underrättas",
          "2. Icke-EU-myndigheter kan i specifika fall tvinga fram åtkomst till data eller system utan att kunderna underrättas",
          "3. Icke-EU-myndigheter kan tvinga fram åtkomst till data eller system, med kunderna underrättade i samtliga fall",
          "4. Icke-EU-myndigheters förfrågningar om åtkomst bestrids av leverantören och i vissa fall slutligen godkänns, med kunderna underrättade",
          "5. Icke-EU-myndigheters förfrågningar om åtkomst till data eller system avvisas alltid av leverantören"
        ]
      },
      "sov-2-q4": {
        "text": "Exportkontrollrestriktioner – tillämplighet av internationella regelverk som ITAR eller EAR, vilka kan begränsa användning eller överföring.",
        "help": "Tillämplighet av exportkontrollregimer som ITAR/EAR vilka skulle kunna begränsa användning eller överföring gentemot EU:s medlemsstater, EU-medborgare eller internationella organisationer. Beakta om någon del av erbjudandet omfattas av sådana kontroller.",
        "answers": [
          "Restriktioner finns gentemot en EU-medlemsstat",
          "Restriktioner finns gentemot EU-medborgare eller internationella organisationer",
          "Andel av intäkterna >50 % inom EU",
          "Del av erbjudandet kan inte exponeras för restriktioner gentemot EU-medlemsstater",
          "Del av erbjudandet kan inte exponeras för restriktioner gentemot EU-medlemsstater eller internationella organisationer"
        ]
      },
      "sov-2-q5": {
        "text": "Immateriella rättigheters ursprung – var immateriella rättigheter skapas, registreras och utvecklas (alla).",
        "help": "Var den immateriella egendomen skapas, registreras och utvecklas (EU eller tredjeländer). ”Helt inom EU” innebär att all relevant IP har sitt ursprung och utvecklas inom EU.",
        "answers": [
          "1. Helt utanför EU",
          "2. Huvudsakligen utanför EU",
          "3. Blandat inom/utanför EU",
          "4. Huvudsakligen inom EU",
          "5. Helt inom EU"
        ]
      },
      "sov-2-q6": {
        "text": "IP-innehavarens jurisdiktion – den rättsordning som gäller för ägande och verkställighet av IP-rättigheter.",
        "help": "Den rättsordning under vilken IP-rättigheter ägs och verkställs – skild från var IP:n skapades; fokus ligger på vilken rätt som styr själva rättigheterna.",
        "answers": [
          "icke-EU-rätt, ett enda land",
          "icke-EU-rätt, flera icke-EU-länder",
          "Blandad rätt, viss EU",
          "EU-rätt med undantag",
          "helt under EU-rätt"
        ]
      },
      "sov-3-q1": {
        "text": "Kundens kontroll över krypteringsnycklar",
        "help": "Vem som ytterst kontrollerar krypteringsnycklarna, och därmed vem som tekniskt kan läsa data. Toppnivå = exklusiv kundkontroll (t.ex. kundägd HSM / bring-your-own-key) där leverantören inte kan läsa data; lägsta nivå = enbart leverantörens nycklar.",
        "answers": [
          "1. Enbart leverantören",
          "2. Främst leverantören men inte exklusivt",
          "3. Delad – leverantören har översiktsnycklar (override)",
          "4. Kunden har primär kontroll men leverantören kan läsa data eller delar av data",
          "5. Exklusiv kundkontroll – leverantören kan inte läsa data"
        ]
      },
      "sov-3-q2": {
        "text": "Transparenta dataflöden och åtkomstloggar – insyn i när, var och av vem data används, inklusive granskningsbarhet av AI-modellanvändning.",
        "help": "Insyn i när, var och av vem data används, inklusive AI-modellanvändning. Högre nivåer kräver kompletta, kundkontrollerade, realtids- och oberoende granskningsbara loggar.",
        "answers": [
          "1. Inga loggar över dataanvändning",
          "2. Grundläggande loggar ofullständiga (saknar datum, användare, typ av åtkomst, åtkomstväg etc.)",
          "3. Loggar finns men inte i realtid eller kontrollerade av leverantören (i enkäten är leverantören utbytt mot kunden)",
          "4. Full kundkontrollerad insyn i loggåtkomst men inte i realtid",
          "5. Realtidsövervakning från kundens sida och oberoende granskningsbarhet"
        ]
      },
      "sov-3-q3": {
        "text": "Säker radering och bevis på radering av data – mekanismer som garanterar oåterkallelig borttagning av data, med verifierbara bevis.",
        "help": "Om dataradering är oåterkallelig och verifierbar med bevis – från ingen garanti, via manuell/intern bekräftelse, till tekniskt verifierad radering med loggar och oberoende verifiering.",
        "answers": [
          "1. Nej, oåterkallelig radering är varken garanterad eller verifierbar",
          "2. Enbart manuell bekräftelse",
          "3. Intern validering enligt policyer – inga bevis på valideringen sparas",
          "4. Radering verifieras tekniskt med åtkomstloggar",
          "5. Ja, oåterkallelig radering tillämpas systematiskt och verifieras oberoende"
        ]
      },
      "sov-3-q4": {
        "text": "Datalagring strikt inom EU/EES – strikt begränsning av lagring och behandling till europeiska jurisdiktioner, utan fallback till tredjeländer.",
        "help": "Hur strikt lagring och behandling begränsas till EU/EES, där varje kopia och fallback räknas (disaster recovery, supportåtkomst, CDN). Toppnivå är all data exklusivt inom EU utan fallback till tredjeland.",
        "answers": [
          "1. Datalagring i stort sett okänd och inkluderar tredjeländer utan kontroller",
          "2. Data delvis i EU, betydande beroende av tredjeländer och begränsad kontroll",
          "3. Data huvudsakligen i EU, viss användning av tredjeland med standardskydd",
          "4. Data i EU som standard, strikt kontrollerade undantag",
          "5. All data exklusivt inom EU utan fallback till tredjeland"
        ]
      },
      "sov-3-q5": {
        "text": "AI-tjänster – i vilken utsträckning AI-modeller och datapipelines utvecklas, tränas, körs och styrs under EU-kontroll, vilket minimerar beroendet av icke-EU teknikstackar.",
        "help": "I vilken utsträckning AI-modeller och datapipelines utvecklas, tränas, körs och styrs under EU-kontroll, inklusive vilka chips/acceleratorer som används. Högre nivåer minskar beroendet av icke-EU-modeller och -hårdvara (EU-ursprung på modeller och chips på toppnivå).",
        "answers": [
          "Icke-EU eller obestämda: Black-box AI, begränsade chips",
          "Främst icke-EU-beroenden: Licensierad AI, chipberoende",
          "Blandad kontroll med alternativ: Granskningsbar eller öppen källkods-AI, utländska chips",
          "EU-ledd AI, utländska acceleratorer",
          "EU-ursprungliga modeller och chips – inga beroenden utanför EU"
        ]
      },
      "sov-4-q1": {
        "text": "Portabilitet och interoperabilitet – hur lätt arbetsbelastningar kan migreras eller integreras med alternativa EU-kontrollerade lösningar utan leverantörsinlåsning.",
        "help": "Hur lätt arbetsbelastningar och data kan migreras till alternativa EU-kontrollerade lösningar utan inlåsning – från inga garantier för portabilitet, via dokumenterade exportmetoder och migreringstjänster, till redan driftsatt på suverän infrastruktur.",
        "answers": [
          "1. Inga garantier ges för portabilitet av data eller arbetsbelastningar",
          "2. Dataexport och portabilitet av arbetsbelastningar tillhandahålls på ”best-effort”-basis",
          "3. Standardiserade dokumenterade metoder för dataexport finns",
          "4. Formella migreringstjänster finns för att underlätta flytt av data och arbetsbelastningar",
          "5. Lösningen är redan driftsatt på suverän infrastruktur"
        ]
      },
      "sov-4-q2": {
        "text": "Förmåga att driva utan utländska beroenden – EU-operatörers kapacitet att hantera, underhålla och stödja tekniken utan att kräva icke-EU-leverantörer",
        "help": "Om EU-baserade team kan driva, underhålla och stödja tekniken utan att kräva icke-EU-leverantörer. Bedöm utifrån vem som faktiskt utför kritiska moment, inte bara var avtalet ligger.",
        "answers": [
          "1. Kritiska driftstjänster levereras av icke-EU-team",
          "2. Driftstjänster hämtas delvis från inom EU",
          "3. Driftsansvaret är balanserat mellan EU- och icke-EU-team",
          "4. Driftstjänster levereras huvudsakligen av EU-baserade team",
          "5. Hela teknikstacken hanteras och stöds av ett helt EU-baserat team"
        ]
      },
      "sov-4-q3": {
        "text": "Tillgång till kompetens – förekomst av en EU-baserad talangpool med expertis att driva och underhålla tjänsten.",
        "help": "Tillgång på en EU-baserad kompetenspool som kan driva och underhålla tjänsten. Högre nivåer innebär att personalen är EU-baserad (och på toppnivå säkerhetsprövd) snarare än att ärenden eskaleras till icke-EU-team.",
        "answers": [
          "Globalt team, huvudsakligen icke-EU",
          "Blandat, majoritet utanför EU",
          "Majoriteten i EU, eskalering utomlands",
          "All personal i EU",
          "100 % EU-personal + säkerhetsprövning"
        ]
      },
      "sov-4-q4": {
        "text": "Supportkanaler – försäkran om att operativt stöd levereras från inom EU och enbart under EU/EES rättsliga regelverk",
        "help": "Varifrån operativt stöd levereras och vilken rätt som styr det. Toppnivå: all supportpersonal inom EU med relevanta säkerhetsprövningar; lägre nivåer innebär icke-EU-support eller eskalering utanför EU.",
        "answers": [
          "1. Supportteamet är globalt med majoriteten av personalen utanför EU",
          "2. Teamet är blandat men majoriteten av supportpersonalen befinner sig utanför EU",
          "3. Majoriteten av supportpersonalen finns i EU men eskaleringar hanteras av icke-EU-team",
          "4. All supportpersonal är placerad inom EU",
          "5. All supportpersonal är placerad inom EU och innehar relevanta säkerhetsprövningar"
        ]
      },
      "sov-4-q5": {
        "text": "Dokumentation och kunskapsöverföring – tillgång till full teknisk dokumentation, källkod och operativt kunnande som möjliggör långsiktig autonomi.",
        "help": "Var teknisk dokumentation, källkod och operativt kunnande lagras och hanteras, och om detta möjliggör långsiktig autonomi. Högre nivåer innebär att innehåll, metadata och säkerhetskopior hålls inom EU med privilegierad åtkomst begränsad till EU.",
        "answers": [
          "1. Global/icke-EU-exponering – dokumentation/kunskap lagras eller hanteras utanför EU och kan vara föremål för icke-EU jurisdiktion eller åtkomst",
          "2. EU är valfritt, inte tvingande – lagring i EU finns som alternativ men tillämpas inte",
          "3. EU primärt med icke-EU-fallback – lagras/hanteras i EU som standard, men viss lagring/replikering/åtkomst utanför EU kan förekomma (t.ex. disaster recovery/support)",
          "4. Enbart EU-baserade primärlager – all primär dokumentation och kunskapsarkiv lagras i EU (ingen rutinmässig lagring/behandling utanför EU)",
          "5. End-to-end inom EU – innehåll, metadata och säkerhetskopior/repliker lagras i EU och privilegierad administration/supportåtkomst är begränsad till EU-baserad personal under EU-jurisdiktion"
        ]
      },
      "sov-4-q6": {
        "text": "Underleverantörers och leverantörers jurisdiktion – plats och rättslig kontroll över kritiska leverantörer eller underleverantörer i tjänsteleveransen.",
        "help": "Plats och rättslig kontroll över de kritiska underleverantörerna och leverantörerna i leveranskedjan, och vad som händer med tjänsten om de skärs av – samma motståndskraftsskala från omedelbar avstängning till full autonomi.",
        "answers": [
          "1. Omedelbar avstängning av tjänsten förväntas",
          "2. Tjänsten skulle troligen stoppas men med viss fördröjning för att ge kunden tid att reagera",
          "3. Kan fortsätta tillfälligt enligt avtal med kommissionen (EC)",
          "4. Förmåga att hitta alternativa leverantörer eller internalisera nyckelfunktioner",
          "5. Full autonomi och kontinuitet"
        ]
      },
      "sov-5-q1": {
        "text": "Komponenters ursprung – geografisk källa till viktiga fysiska delar",
        "help": "Geografisk källa och redovisning av viktiga fysiska delar (CPU:er, GPU:er, lagring) – från ingen redovisning, via transparens med undantag, till EU-certifierat ursprung.",
        "answers": [
          "Ingen redovisning",
          "Delvis redovisning",
          "Transparent med undantag",
          "Full transparens",
          "EU-certifierat ursprung"
        ]
      },
      "sov-5-q2": {
        "text": "Komponenters ursprung: tillverkningsplats – länder där hårdvara tillverkas eller monteras",
        "help": "Var hårdvaran faktiskt tillverkas eller monteras, och revisionsrätterna över detta. Toppnivå: exklusivt konstruerad och byggd av EU-team; lägsta nivå: helt utländsk ”black box”.",
        "answers": [
          "Helt utländsk, black box",
          "Utländskt ursprung, delvis redovisning",
          "Blandad anskaffning, EU revisionsrätt",
          "Byggd av EU-team, utifrån utländsk kod",
          "Exklusivt konstruerad och byggd av EU-team"
        ]
      },
      "sov-5-q3": {
        "text": "Komponenters ursprung – jurisdiktion och ursprung för inbäddad kod som styr hårdvara och firmware",
        "help": "Jurisdiktion och ursprung för den inbäddade kod/firmware som styr hårdvaran – fokus på transparens och redovisning av vem som kontrollerar denna lågnivåkod.",
        "answers": [
          "Ingen redovisning",
          "Delvis redovisning",
          "Transparent med undantag",
          "Full transparens",
          "EU-certifierat ursprung"
        ]
      },
      "sov-5-q4": {
        "text": "Mjukvarans ursprung (alla) – var och av vem mjukvaran arkitektureras och programmeras",
        "help": "Var och av vem mjukvaran arkitektureras och programmeras. Högre nivåer innebär att kärn- och väsentliga delar (och till slut allt) konstrueras och underhålls av EU-team, kontra en utländsk ”black box”.",
        "answers": [
          "1. Mjukvaran är helt av utländskt ursprung utan transparens (”black box”)",
          "2. Mjukvaran är av utländskt ursprung med delvis redovisning av dess utveckling",
          "3. Kärn- och väsentliga delar av mjukvaran konstrueras och underhålls av EU-team",
          "4. En stor majoritet av mjukvaran konstrueras och underhålls av EU-team",
          "5. Mjukvaran konstrueras och underhålls exklusivt av EU-team"
        ]
      },
      "sov-5-q5": {
        "text": "Mjukvarans ursprung (alla) – plats och jurisdiktion som styr paketering, distribution och uppdateringar av mjukvara.",
        "help": "Vem som kontrollerar och kör bygg-/release-/distributionspipelinen (administration, kodsignering, godkännanden) och under vilken jurisdiktion. Toppnivå: EU-kontroll och EU-utförande med EU-tvingande policy-/säkerhetsportar.",
        "answers": [
          "1. Icke-EU-kontroll och -utförande – bygg/release/deployment körs och styrs av icke-EU-team, med kontroll över pipeline och godkännanden under icke-EU jurisdiktion",
          "2. EU-kontroll, icke-EU-utförande – utförandet görs av icke-EU-team, men pipelineadministration och slutliga releasegodkännanden ligger under EU-jurisdiktion",
          "3. Icke-EU-kontroll, EU-utförande – utförandet görs av EU-team, men pipelineadministration och/eller slutliga releasegodkännanden (inkl. signering) ligger under icke-EU jurisdiktion",
          "4. EU-kontroll och EU-utförande – bygg/release/deployment körs av EU-team och styrs från EU (pipelineadministration, signering, godkännanden)",
          "5. EU-kontroll och EU-policyportar – som (4), plus EU-baserade compliance-/säkerhetsportar som tillämpas i pipelinen (t.ex. signering under er kontroll, sårbarhetskontroller, åtskillnad av uppgifter, granskningsbara godkännanden)"
        ]
      },
      "sov-5-q6": {
        "text": "Enskild beroendepunkt (single point of dependency) – graden av beroende av icke-EU-leverantörer, anläggningar eller proprietära tekniker",
        "help": "Beroende av enskilda icke-EU-leverantörer, anläggningar eller proprietära tekniker i kritiska respektive icke-kritiska tjänster, och om detta beroende är dokumenterat. Toppnivå: inget beroende av någon icke-EU-leverantör eller -anläggning.",
        "answers": [
          "Enbart icke-EU-leverantörer eller -anläggningar är inblandade",
          "Främst icke-EU-leverantörer eller -anläggningar i kritiska tjänster, ej dokumenterat",
          "Få icke-EU-leverantörer eller -anläggningar i kritiska tjänster, ej dokumenterade, eller icke-EU-leverantörer/-anläggningar transparent dokumenterade",
          "Få icke-EU-leverantörer eller -anläggningar i icke-kritiska tjänster, dokumenterade",
          "Inget beroende av icke-EU-leverantör eller -anläggning"
        ]
      },
      "sov-5-q7": {
        "text": "Transparens i leveranskedjan – insyn i hela kedjan av leverantörer och underleverantörer, inklusive revisionsrätter.",
        "help": "Insyn i hela kedjan av leverantörer och underleverantörer, inklusive revisionsrätter – från inga revisionsrätter, via att kritiska leverantörer kan revideras, till att alla leverantörer och underleverantörer kan revideras.",
        "answers": [
          "Inga leverantörer kan revideras",
          "Vissa leverantörer och underleverantörer kan revideras",
          "Kritiska leverantörer och underleverantörer kan revideras",
          "De flesta leverantörer och underleverantörer kan revideras",
          "Alla leverantörer och underleverantörer kan revideras"
        ]
      },
      "sov-6-q1": {
        "text": "Interoperabilitet och öppna gränssnitt – förmåga att integrera med andra tekniker via väldokumenterade och icke-proprietära API:er eller protokoll.",
        "help": "Om du kan integrera via väldokumenterade, icke-proprietära API:er och protokoll. Högre nivåer följer huvudsakligen erkända öppna standarder (ISO/IEC, ETSI/CEN, IETF/W3C) och öppna format som möjliggör portabilitet, kontra slutna proprietära gränssnitt.",
        "answers": [
          "1. Slutna proprietära gränssnitt – integrationer bygger på slutna eller proprietära gränssnitt och format som kontrolleras av leverantören",
          "2. Begränsade proprietära API:er – vissa leverantörs-API:er finns, men de är begränsade (åtkomst, omfattning, licensiering) och interoperabiliteten förblir leverantörsstyrd",
          "3. Blandad (delvis öppenhet) – nyckelgränssnitt är dokumenterade och delvis standardbaserade, men viktiga funktioner eller dataformat förblir proprietära/leverantörsspecifika",
          "4. Standardbaserad och brett kompatibel – gränssnitt och dataformat följer huvudsakligen erkända öppna standarder (t.ex. ETSI/CEN/CENELEC, ISO/IEC, IETF/W3C) med stabil versionshantering och full dokumentation",
          "5. Öppen som standard med portabilitet – alla kritiska funktioner är åtkomliga via öppna, väldokumenterade, icke-proprietära API:er och standardformat, med publicerade specifikationer och minimala leverantörsspecifika beroenden som möjliggör enkel tredjepartsintegration"
        ]
      },
      "sov-6-q2": {
        "text": "Efterlevnad av öppna standarder – i vilken utsträckning lösningen följer offentligt styrda och brett antagna standarder, vilket minskar beroendet av enskilda leverantörer",
        "help": "Om kärntjänster (identitet/IAM, dataformat, meddelanden, loggning, integration) följer offentligt styrda öppna standarder enligt en formell policy. Toppnivå: en formell policy föreskriver öppna standarder för alla kärntjänster.",
        "answers": [
          "1. Inga öppna standarder – kärntjänster (t.ex. identitets- och åtkomsthantering, dataformat, meddelanden, säkerhet, loggning, integrationsprotokoll) bygger huvudsakligen på proprietära tekniker",
          "2. Ad hoc-användning – öppna standarder används inkonsekvent från fall till fall, utan dokumenterad motivering eller styrning",
          "3. Delvis införande i kärnan – öppna standarder används och dokumenteras för vissa kärntjänster, medan andra kärntjänster förblir proprietära/leverantörsspecifika",
          "4. Policy för de flesta kärntjänster – en formell policy föreskriver och dokumenterar öppna standarder för de flesta kärntjänster, med hanterade undantag",
          "5. Policy för alla kärntjänster – en formell policy föreskriver och dokumenterar öppna standarder för alla kärntjänster"
        ]
      },
      "sov-6-q3": {
        "text": "Tillgång till öppen källkod – om mjukvaran är tillgänglig under öppna licenser, med rätt att granska, ändra och vidaredistribuera, vilket säkerställer transparens och anpassningsförmåga",
        "help": "Om mjukvaran är öppen källkod med rätt att granska, ändra och vidaredistribuera, och hur dess styrning är strukturerad. Toppnivå: helt öppen källkod styrd av en oberoende eller EU-baserad enhet, vilket möjliggör överlämning; lägsta nivå: helt sluten och leverantörsstyrd.",
        "answers": [
          "1. Mjukvaran är helt sluten källkod utan rätt att granska eller ändra och dess styrning är leverantörskontrollerad",
          "2. Källkoden är tillgänglig för granskning men ändrings- och överlämningsrätter gäller under mycket strikta villkor",
          "3. Mjukvaran är öppen källkod som tillåter ändring och vidaredistribution, men styrningen är centraliserad (t.ex. ett enda företag eller icke-öppen stiftelse), vilket begränsar strategisk autonomi eller smidig överlämning",
          "4. Mjukvaran är öppen källkod med betydande EU-bidrag men styrningen är begränsad och överlämning är möjlig",
          "5. Helt öppen källkod styrs av en oberoende eller EU-baserad enhet, vilket ger fulla rättigheter att granska, ändra, vidaredistribuera och sömlöst överföra förvaltarskapet"
        ]
      },
      "sov-6-q4": {
        "text": "Transparens i tjänstens arkitektur – insyn i tjänstens design och funktion, inklusive arkitekturdokumentation, dataflöden och beroenden",
        "help": "Insyn i tjänstens design, dataflöden och beroenden (arkitekturdokumentation). Högre nivåer ger offentlig insyn och, på toppnivå, låter kunder bidra med förändringar.",
        "answers": [
          "Ingen insyn ges",
          "Insyn tillgänglig vid revisioner",
          "Vis offentlig insyn finns (alla)",
          "Stort korpus av offentlig insyn finns (alla)",
          "Kunder kan bidra för att anpassa och förbättra tjänsten"
        ]
      },
      "sov-6-q5": {
        "text": "HPC-suveränitet – graden av europeiskt oberoende inom högpresterande datorer (HPC), inklusive processorer, acceleratorer och mjukvaruekosystem.",
        "help": "Europeiskt oberoende inom högpresterande datorer – processorer, acceleratorer och mjukvaruekosystem – från importerade black-box HPC, via EU-värd/utländsk stack och EU-samdesign, till EU-design + EU-tillverkning + EU-drift.",
        "answers": [
          "Importerade black-box HPC-datorer",
          "EU-värd, utländsk stack",
          "Samdesignad eller integrerad i EU",
          "EU-processor-IP, icke-EU fabriker",
          "EU-design + EU-fabrik + EU-drift"
        ]
      },
      "sov-7-q1": {
        "text": "Säkerhetscertifiering – uppnådda EU- och internationellt erkända certifieringar (alla)",
        "help": "Nivå av erkänd säkerhetsgaranti/certifiering, på ramverkets utvärderingsgarantiskala (t.ex. EAL2 upp till EAL4-5). Välj den högsta nivån som uppnåtts oberoende.",
        "answers": [
          "ELA0",
          "ELA1",
          "EAL2",
          "ELA3",
          "EAL4-5"
        ]
      },
      "sov-7-q2": {
        "text": "EU:s regelverksefterlevnad – påvisbar efterlevnad av GDPR, NIS2, DORA och andra EU-ramverk",
        "help": "Påvisbar efterlevnad av GDPR, NIS2, DORA och andra EU-ramverk. Högre nivåer kräver verifierad, oberoende reviderad efterlevnad snarare än informella eller partiella rutiner.",
        "answers": [
          "1. Ingen påvisbar efterlevnad av några EU-förordningar",
          "2. Begränsad efterlevnad av vissa välkända EU-förordningar (grundläggande rutiner finns men är informella, ofullständiga eller osystematiska)",
          "3. Måttlig efterlevnad av vissa välkända EU-förordningar (kontroller finns men luckor kvarstår; efterlevnad inte fullt påvisad)",
          "4. Partiell efterlevnad av de flesta välkända EU-förordningar (krav implementerade och operativa med mindre undantag)",
          "5. Full efterlevnad av alla välkända EU-förordningar (verifierad efterlevnad, oberoende reviderad)"
        ]
      },
      "sov-7-q3": {
        "text": "EU-baserad SOC och incidenthantering – säkerhetsoperationscenter och responssteam som arbetar exklusivt under EU-jurisdiktion.",
        "help": "Om säkerhetsverksamhet och incidentrespons körs exklusivt under EU-jurisdiktion. Toppnivå: hela incidentlivscykeln hanteras av EU-team som deltar i ENISA:s informationsutbyte; lägre nivåer eskaleras till icke-EU-team.",
        "answers": [
          "1. SOC och incidentresponsteamen är placerade utanför EU",
          "2. En hybridmodell används där SOC-funktioner delas mellan EU och icke-EU platser",
          "3. Primär-SOC ligger i EU men incidenter kan eskaleras till icke-EU-team",
          "4. Hela incidentlivscykeln hanteras av team som arbetar exklusivt inom EU. Hotintelligens och incidentdata hämtas huvudsakligen från EU-källor",
          "5. Hela incidentlivscykeln hanteras av EU-baserade team med aktivt deltagande i ENISA:s ramverk för informationsutbyte. Hotintelligens och incidentdata samlas in världen över"
        ]
      },
      "sov-7-q4": {
        "text": "Kontroll över säkerhetsövervakning/loggning – kundens eller en EU-myndighets förmåga att direkt övervaka loggar, larm och övervakningsfunktioner.",
        "help": "Om kunden eller en EU-myndighet direkt kan övervaka loggar, larm och övervakning, och var loggarna lagras. Toppnivå: full åtkomst till oföränderliga, manipulationssäkra loggar som lagras exklusivt inom EU.",
        "answers": [
          "1. Leverantören behåller full kontroll över alla säkerhetsloggar och övervakning",
          "2. Kunder får periodiska rapporter baserade på säkerhetsloggar",
          "3. Kunder har åtkomst till en grundläggande portal för övervakning",
          "4. Kunder har full direktåtkomst till sin säkerhetsövervakning och sina loggar som lagras i EU",
          "5. Kunder har full åtkomst till oföränderliga, manipulationssäkra loggar som lagras exklusivt inom EU"
        ]
      },
      "sov-7-q5": {
        "text": "Rapportering av incidenter – transparent, snabb och EU-kompatibel rapportering av intrång eller sårbarheter",
        "help": "Transparens, aktualitet och EU-efterlevnad vid rapportering av intrång/sårbarheter och samarbete med EU:s CSIRT:er. Högre nivåer innebär realtidsrapportering med revisionsstöd och påvisad beredskap för utredningar.",
        "answers": [
          "1. Ingen efterlevnad – ad hoc eller avsaknat arbetsflöde för intrångsrapportering, utan möjlighet att samarbeta med EU:s CSIRT:er eller stödja EU-ledda utredningar",
          "2. Begränsad efterlevnad – rapporteringen är reaktiv med begränsad transparens och osäkra tidsramar; CSIRT-samarbete möjligt på best-effort-basis",
          "3. Måttlig efterlevnad – rapporteringsrutiner i linje med GDPR/NIS2 finns på plats och sårbarheter/intrång kommuniceras inom föreskrivna tidsramar; CSIRT-samarbete tillgängligt men inte i realtid",
          "4. Partiell efterlevnad – det finns ett övervakat rapporteringsflöde med interna SLA:er på eller under regulatoriska maximinivåer; avtalsmässigt förberedd att stödja EU-ledda utredningar; datautbyte med EU:s CSIRT:er tillgängligt men inte i realtid",
          "5. Full efterlevnad – fullt EU-kompatibel intrångsrapportering med realtidsdatautbyte till EU:s CSIRT:er med revisionsstödda processer, proaktiv sårbarhetsrapportering och utbyte av hotintelligens; påvisad beredskap för utredningar"
        ]
      },
      "sov-7-q6": {
        "text": "Underhållsautonomi – förmåga att utveckla, testa och tillämpa säkerhetsuppdateringar oberoende av icke-EU-leverantörer",
        "help": "Förmåga att utveckla, testa och tillämpa säkerhetsuppdateringar oberoende av icke-EU-leverantörer. Högre nivåer låter kunden distribuera uppdateringar självständigt (med lämplig testning) snarare än att vara bunden till leverantörens scheman.",
        "answers": [
          "1. Ingen autonomi vid distribution av säkerhetsuppdateringar",
          "2. Begränsad autonomi – säkerhetsuppdateringar distribueras enligt leverantörens schema; grundläggande testning möjlig",
          "3. Måttlig autonomi – säkerhetsuppdateringar distribueras med tillräcklig förvarning till kunden och testning är möjlig, utom vid zero-day-uppdateringar",
          "4. Hög autonomi – säkerhetsuppdateringar kan distribueras självständigt av kunden, utan kundens kontroller",
          "5. Full autonomi – säkerhetsuppdateringar kan distribueras självständigt av kunden, med kundens kontroller"
        ]
      },
      "sov-7-q7": {
        "text": "Granskningsbarhet (auditability) – EU-enheters kapacitet att utföra oberoende säkerhets- och efterlevnadsrevisioner med full åtkomst.",
        "help": "Om oberoende EU-enheter kan utföra säkerhets- och efterlevnadsrevisioner med full åtkomst – från åtkomst enbart för leverantören till fulla revisionsrätter för vilken oberoende enhet som helst.",
        "answers": [
          "1. Ingen åtkomst för andra enheter än leverantören",
          "2. Begränsad åtkomst för oberoende enheter till data som tillhandahålls av leverantören",
          "3. Partiell kontroll för oberoende enheter över data som tillhandahålls av leverantören",
          "4. Hög kontroll för oberoende enheter att begära data från leverantören",
          "5. Full kontroll för vilken oberoende enhet som helst att utföra säkerhets- och efterlevnadsrevisioner"
        ]
      },
      "sov-8-q1": {
        "text": "Energieffektivitet – användning av energieffektiv infrastruktur (alla) och mätbara förbättringsmål.",
        "help": "Datacenters energieffektivitet, mätt med PUE (Power Usage Effectiveness) med förbättringsmål – lägre PUE är bättre; toppnivån är ungefär PUE < 1.2, EU-verifierad.",
        "answers": [
          "PUE > 0",
          "PUE < 3",
          "PUE < 1.5 + vägkarta (roadmap)",
          "PUE < 1.3",
          "PUE < 1.2 EU-verifierad"
        ]
      },
      "sov-8-q2": {
        "text": "Återanvändning och återvinning av hårdvara – cirkulära ekonomipraktiker som säkerställer återanvändning, renovering och ansvarsfull hantering vid livscykelns slut.",
        "help": "Cirkulära ekonomipraktiker för återanvändning, renovering och ansvarsfull sluthantering av hårdvara. Toppnivå: en EU-certifierad livscykel; lägsta nivå: ingen policy.",
        "answers": [
          "Ingen policy",
          "Cirkulär ekonomi EU-anpassad",
          "Dokumenterat program",
          "Cirkulär ekonomi EU-anpassad",
          "EU-certifierad livscykel"
        ]
      },
      "sov-8-q3": {
        "text": "Miljöpåverkansrapportering – transparent mätning och redovisning av koldioxidutsläpp, vattenanvändning och andra hållbarhetsindikatorer.",
        "help": "Transparens kring koldioxid, vatten och andra hållbarhetsmått. Högre nivåer använder en detaljerad EU-metodik och, på toppnivå, EU-reviderad rapportering.",
        "answers": [
          "Ingen rapportering",
          "Detaljerad EU-metodik",
          "Årsrapport",
          "Detaljerad EU-metodik",
          "EU-reviderad rapportering"
        ]
      },
      "sov-8-q4": {
        "text": "Energitillförsel – anskaffning av förnybar eller koldioxidsnål energi för att driva infrastruktur och verksamhet",
        "help": "Anskaffning av förnybar eller koldioxidsnål energi för infrastruktur och verksamhet. Toppnivå: enbart gröna EU-energileveranser; lägsta nivå: icke-spårbar energi.",
        "answers": [
          "Ej spårbar",
          "Enbart EU-energileveranser",
          "Blandning av EU- och icke-EU-leveranser",
          "Enbart EU-energileveranser",
          "Enbart grön EU-energi"
        ]
      }
    }
  }
};
