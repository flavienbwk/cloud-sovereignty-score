// EU Cloud Sovereignty Framework - Assessment data
// Source of truth: European Commission "Cloud Sovereignty Framework - Implementation
// guidance" and the official "Annex - Sovereignty assessment calculator" (published
// 1 June 2026). Framework objectives unchanged since v1.2.1 (October 2025).
//
// Each answer carries:
//   - value : reference point value from the official calculator (contracting
//             authorities MAY adapt these; the calculator's own example values are
//             illustrative). Used for the weighted Sovereignty Score.
//   - seal  : the SEAL level (0-4) that answer guarantees. Used for the weakest-link
//             SEAL computation (overall SEAL = the MINIMUM across all answered criteria).
//
// Each question carries a `help` field: plain-language guidance (authored from the
// framework's own criteria descriptions) clarifying the criterion's scope and how to
// read its answer ladder. Shown via the info (i) toggle in the UI.
//
// Note: the official calculator left two intermediate answer labels blank in SOV-1 Q6;
// they are filled here with neutral ordinal wording ("Minimal/Significant participation").

const assessmentData = {
  "framework": {
    "name": "EU Cloud Sovereignty Framework",
    "version": "v1.2.1 (October 2025)",
    "methodology": "Implementation Guidance & Sovereignty Assessment Calculator (1 June 2026)",
    "scoreDivisor": 1000
  },
  "sealLevels": [
    {
      "level": 0,
      "code": "SEAL-0",
      "name": "No Sovereignty",
      "description": "Service, technology or operations under exclusive control of non-EU third parties, governed entirely by non-EU jurisdictions."
    },
    {
      "level": 1,
      "code": "SEAL-1",
      "name": "Jurisdictional Sovereignty",
      "description": "EU law formally applies with limited practical enforceability; service, technology or operations under exclusive control of non-EU third parties."
    },
    {
      "level": 2,
      "code": "SEAL-2",
      "name": "Data Sovereignty",
      "description": "EU jurisdictions apply, with material dependencies remaining; service, technology or operations under indirect control of non-EU third parties."
    },
    {
      "level": 3,
      "code": "SEAL-3",
      "name": "Technological Sovereignty",
      "description": "EU jurisdictions apply, EU actors exercising meaningful but not full influence; service, technology or operations under marginal control of non-EU third parties."
    },
    {
      "level": 4,
      "code": "SEAL-4",
      "name": "Full Digital Sovereignty",
      "description": "Technology and operations under complete EU control, subject only to EU jurisdiction, with no critical non-EU dependencies."
    }
  ],
  "objectives": [
    {
      "code": "SOV-1",
      "id": "strategic",
      "name": "Strategic Sovereignty",
      "description": "Strategic sovereignty captures the degree to which a cloud provider (or technology actor) is anchored within the European Union/EEA legal, financial, and industrial ecosystem. It assesses ownership stability, governance influence, and alignment with EU strategic priorities.",
      "weight": 0.2,
      "questions": [
        {
          "id": "sov-1-q1",
          "number": 1,
          "text": "EU/EEA legal entity control - ensuring that ultimate decision-making authority resides within EU jurisdiction.",
          "help": "Assesses where ultimate decision-making authority over the provider legally sits — the jurisdiction of the controlling entity and its ultimate owners, not where individual staff or shareholders happen to live. 'Entirely within the EU' means the legal entity and whoever ultimately controls it are all under EU/EEA jurisdiction, with no non-EU party able to direct strategic decisions.",
          "answers": [
            {
              "label": "1. Entirely outside the EU",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Mostly outside the EU",
              "value": 41.67,
              "seal": 1
            },
            {
              "label": "3. Mostly within the EU",
              "value": 83.34,
              "seal": 3
            },
            {
              "label": "4. Entirely within the EU",
              "value": 125.01,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q2",
          "number": 2,
          "text": "Change of Control Risk - evaluating the likelihood of takeover or transfer to non-sovereign owners",
          "help": "How likely the provider could be acquired by or transferred to an owner outside EU/EEA control (foreign takeover, sale of a majority stake, parent-company change). Judge realistically from the ownership and investor structure and any control protections (e.g. golden shares); 'Very unlikely' implies durable safeguards against a non-EU takeover.",
          "answers": [
            {
              "label": "1. Very likely",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "2. Likely takeover by or transfer to a non-EU sovereign entity",
              "value": 31.25,
              "seal": 4
            },
            {
              "label": "3. Somewhat likely takeover by or transfer to a non-EU sovereign entity",
              "value": 62.5,
              "seal": 4
            },
            {
              "label": "4. Unlikely takeover by or transfer to a non-EU sovereign entity",
              "value": 93.75,
              "seal": 4
            },
            {
              "label": "5. Very unlikely",
              "value": 125.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q3",
          "number": 3,
          "text": "Control Over Roadmap - measuring the capacity of EU stakeholders to shape the provider’s technological and service evolution.",
          "help": "Whether EU stakeholders can shape the product/service roadmap — from no influence, through public feedback channels, to formal governance bodies with EU participation, up to EU actors having decisive influence.",
          "answers": [
            {
              "label": "1. No influence possible",
              "value": 0.0,
              "seal": 2
            },
            {
              "label": "2. Through \"voice of the customer\" public channels (e.g. feedback portals, online communities)",
              "value": 41.67,
              "seal": 2
            },
            {
              "label": "3. Governance bodies exist with EU actors participation",
              "value": 83.34,
              "seal": 3
            },
            {
              "label": "4. Full influence of EU actors",
              "value": 125.01,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q4",
          "number": 4,
          "text": "Financial independence from non-EU capital - degree to which the provider relies on EU-based financing rather than external capital.",
          "help": "How far the provider is financed by EU-based capital rather than non-EU investors or lenders. Consider the origin of equity, venture funding and debt, not merely where a bank account sits.",
          "answers": [
            {
              "label": "1. Almost entirely relying on non-EU funding",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "2. Mostly relying on non-EU funding",
              "value": 31.25,
              "seal": 4
            },
            {
              "label": "3. Balanced mix of EU and non-EU funding",
              "value": 62.5,
              "seal": 4
            },
            {
              "label": "4. Majority of funding is EU-based",
              "value": 93.75,
              "seal": 4
            },
            {
              "label": "5. Entirely EU-based funding",
              "value": 125.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q5",
          "number": 5,
          "text": "EU economic contribution - extent of investment, jobs, and value creation within EU/EEA.",
          "help": "Extent of investment, jobs and value creation retained inside the EU/EEA (R&D, payroll, taxes, facilities). 'Fully in the EU' means substantially all economic value is generated and kept in the EU.",
          "answers": [
            {
              "label": "1. Minimal",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "2. Some",
              "value": 31.25,
              "seal": 4
            },
            {
              "label": "3. Balanced EU/non-EU",
              "value": 62.5,
              "seal": 4
            },
            {
              "label": "4. Majority in the EU",
              "value": 93.75,
              "seal": 4
            },
            {
              "label": "5. Fully in the EU",
              "value": 125.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q6",
          "number": 6,
          "text": "Participation in EU strategic programs - involvement in initiatives such as IPCEI-CIS, Horizon Europe, or Gaia-X.",
          "help": "Active, structural involvement in EU strategic initiatives such as IPCEI-CIS, Horizon Europe or Gaia-X — deeper participation scores higher than nominal membership.",
          "answers": [
            {
              "label": "No clear participation",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "Minimal participation",
              "value": 31.25,
              "seal": 4
            },
            {
              "label": "Active participant in strategic projects",
              "value": 62.5,
              "seal": 4
            },
            {
              "label": "Significant participation",
              "value": 93.75,
              "seal": 4
            },
            {
              "label": "Strategic projects depend on contractor's involvement",
              "value": 125.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q7",
          "number": 7,
          "text": "Alignment with EU industrial strategies - consistency with digital, green, and industrial sovereignty objectives defined at EU level.",
          "help": "Consistency with EU digital, green and industrial sovereignty goals, evidenced by concrete plans, measured achievements and dedicated governance — not merely stated intentions.",
          "answers": [
            {
              "label": "No evidence exist",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "Existing Action plan (how to measure ambition? Through means linked to the goals? Relative to the size of the company?)",
              "value": 41.67,
              "seal": 4
            },
            {
              "label": "Already measured achievement and existing dedicated governance",
              "value": 83.0,
              "seal": 4
            },
            {
              "label": "Bold ambition and dedicated means",
              "value": 125.01,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-1-q8",
          "number": 8,
          "text": "Resilience to Cut-off - ability to sustain secure operations even if vendor support is withdrawn or disrupted.",
          "help": "Whether the service could keep running securely if a (typically non-EU) vendor withdrew support or was disrupted: from immediate shutdown, through contractual continuity, to full autonomy or the ability to re-source/internalise key functions.",
          "answers": [
            {
              "label": "1. Immediate shutdown of the service is expected",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Service would likely stop but with a delay to provide time for customer reaction",
              "value": 31.25,
              "seal": 0
            },
            {
              "label": "3. Can continue temporarily based on contractual agreement with EC",
              "value": 62.5,
              "seal": 2
            },
            {
              "label": "4. Ability to source alternative suppliers or internalise key functions",
              "value": 93.75,
              "seal": 2
            },
            {
              "label": "5. Full autonomy and continuity",
              "value": 125.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-2",
      "id": "legal",
      "name": "Legal & Jurisdictional Sovereignty",
      "description": "Legal & Jurisdictional sovereignty evaluates the legal environment, exposure to foreign authority, and enforceability of rights that govern a technology provider and its services. It determines the extent to which a provider is anchored in European jurisdiction and insulated from external legal claims.",
      "weight": 0.1,
      "questions": [
        {
          "id": "sov-2-q1",
          "number": 1,
          "text": "Primary Legal Jurisdiction - the national legal system governing the provider’s operations and contracts.",
          "help": "Which legal system actually governs the entity delivering the service and its contracts. 'Exclusively EU law' means operations and contracts are governed solely under EU/Member-State law, with no governing non-EU law.",
          "answers": [
            {
              "label": "1. Non-EU only",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Mixed EU/non-EU",
              "value": 84.0,
              "seal": 1
            },
            {
              "label": "3. Exclusively EU law",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-2-q2",
          "number": 2,
          "text": "Extraterritorial Laws - degree of exposure to non-EU laws with cross-border reach (all).",
          "help": "Exposure to non-EU laws with cross-border reach (e.g. US CLOUD Act, FISA 702, Chinese Cybersecurity Law) that could compel the provider regardless of EU law. Higher levels need structural insulation (EU-controlled entity, verified legal immunity), not just contractual clauses.",
          "answers": [
            {
              "label": "Fully exposed to non-EU laws",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Mitigation clauses, exposure remains",
              "value": 41.75,
              "seal": 1
            },
            {
              "label": "EU subsidiary with contractual protections",
              "value": 83.5,
              "seal": 1
            },
            {
              "label": "Legal structures shielding from foreign law",
              "value": 125.25,
              "seal": 2
            },
            {
              "label": "Verified legal immunity, non-EU laws unenforceable",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-2-q3",
          "number": 3,
          "text": "Data Access Pathways - existence of legal, contractual, or technical channels through which non-EU authorities could compel access to data or systems.",
          "help": "Whether legal, contractual or technical channels let non-EU authorities compel access to data or systems, and whether customers would be told. Best case: such requests are always rejected by the provider.",
          "answers": [
            {
              "label": "1. Non-EU authorities can compel access to data or systems without customers being notified",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Non-EU authorities can compel access to data or systems without customers being notified, in specific cases",
              "value": 41.75,
              "seal": 1
            },
            {
              "label": "3. Non-EU authorities can compel access to data or systems with customers being notified in all cases",
              "value": 83.5,
              "seal": 1
            },
            {
              "label": "4. Non-EU authorities requests to access data or systems are disputed by the provider and eventually in some cases are accepted with customers being notified",
              "value": 125.25,
              "seal": 1
            },
            {
              "label": "5. Non-EU authorities requests to access data or systems are always rejected by the provider",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-2-q4",
          "number": 4,
          "text": "Export Control Restrictions - applicability of international regimes such as ITAR or EAR, which may restrict usage or transfer.",
          "help": "Applicability of export-control regimes such as ITAR/EAR that could restrict use or transfer towards EU Member States, EU citizens or international organisations. Consider whether any part of the offer is subject to such controls.",
          "answers": [
            {
              "label": "Restrictions exists towards a EU MS",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "Restrictions exists towards EU citizens or international organisations",
              "value": 41.75,
              "seal": 1
            },
            {
              "label": "Share of revenues >50% in the EU",
              "value": 83.5,
              "seal": 2
            },
            {
              "label": "Part of the offer cannot be exposed to restrictions towards EU MSs",
              "value": 125.25,
              "seal": 3
            },
            {
              "label": "Part of the offer cannot be exposed to restrictions towards EU MSs or international organisations",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-2-q5",
          "number": 5,
          "text": "Origin of IP - location of intellectual property creation, registration, and development (all).",
          "help": "Where the intellectual property is created, registered and developed (EU vs third countries). 'Fully within the EU' means all relevant IP originates and is developed in the EU.",
          "answers": [
            {
              "label": "1. Entirely outside the EU",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "2. Mostly outside the EU",
              "value": 41.75,
              "seal": 4
            },
            {
              "label": "3. Mixed within/outside the EU",
              "value": 83.5,
              "seal": 4
            },
            {
              "label": "4. Mostly within the EU",
              "value": 125.25,
              "seal": 4
            },
            {
              "label": "5. Fully within the EU",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-2-q6",
          "number": 6,
          "text": "IP Holder Jurisdiction - legal jurisdiction where IP rights are owned and enforced.",
          "help": "The legal jurisdiction under which IP rights are owned and enforced — distinct from where the IP was created; this focuses on the governing law of the rights themselves.",
          "answers": [
            {
              "label": "non-EU law, one single country",
              "value": 0.0,
              "seal": 3
            },
            {
              "label": "non-EU law, mixed non-EU countries",
              "value": 41.75,
              "seal": 3
            },
            {
              "label": "Mixed law, some EU",
              "value": 83.5,
              "seal": 3
            },
            {
              "label": "EU law with exceptions",
              "value": 125.25,
              "seal": 4
            },
            {
              "label": "fully under EU law",
              "value": 167.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-3",
      "id": "data_control",
      "name": "Data & AI Sovereignty",
      "description": "Data & AI sovereignty focuses on the protection, control, and independence of data assets and AI services within the EU/EEA. It addresses how data is secured, where it is processed, and the degree of autonomy customers retain over AI   capabilities.",
      "weight": 0.1,
      "questions": [
        {
          "id": "sov-3-q1",
          "number": 1,
          "text": "Customer control over encryption keys",
          "help": "Who ultimately controls the encryption keys, and therefore who can technically read the data. Top level = customer-exclusive control (e.g. customer-held HSM / bring-your-own-key) where the provider cannot read the data; bottom = provider-only keys.",
          "answers": [
            {
              "label": "1. Provider only",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Primarily the provider but not exclusively",
              "value": 50.0,
              "seal": 1
            },
            {
              "label": "3. Shared - provider has override keys",
              "value": 100.0,
              "seal": 2
            },
            {
              "label": "4. Customer primary control but provider can read the data or some of the data",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "5. Customer exclusive control - provider can not read the data",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-3-q2",
          "number": 2,
          "text": "Transparent data flows & access logs - visibility into when, where, and by whom data is accessed, including auditability of AI model usage.",
          "help": "Visibility into when, where and by whom data is accessed, including AI model usage. Higher levels require complete, customer-controlled, real-time and independently auditable logs.",
          "answers": [
            {
              "label": "1. No data usage logs",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Basic logs incomplete (missing date; missing user; missing type of access; missing means of access etc.)",
              "value": 50.0,
              "seal": 1
            },
            {
              "label": "3. Logs exist but not real-time or controlled by vendor (vendor is replaced by CUSTOMER in the survey)",
              "value": 100.0,
              "seal": 2
            },
            {
              "label": "4. Full customer controlled visibility of log access but not in real time",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "5. Real-time customer oversight and independent auditability",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-3-q3",
          "number": 3,
          "text": "Secure deletion & proof of erasure od data - mechanisms guaranteeing irreversible removal of data, with verifiable evidence.",
          "help": "Whether data deletion is irreversible and verifiable with evidence — from no guarantee, through manual/internal confirmation, to technically verified deletion with logs and independent verification.",
          "answers": [
            {
              "label": "1. No, irreversible deletion is neither guaranteed nor verifiable",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Manual confirmation only",
              "value": 50.0,
              "seal": 1
            },
            {
              "label": "3. Internal validation based on policies - no proof of validation left",
              "value": 100.0,
              "seal": 1
            },
            {
              "label": "4. Deletion is technically verified with access logs",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "5. Yes, irreversible deletion is systematically enforced and independently verified",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-3-q4",
          "number": 4,
          "text": "Data location strictly in EU/EEA – strict confinement of storage and processing to European jurisdictions, with no fallback to third countries.",
          "help": "How strictly storage and processing are confined to the EU/EEA, counting every copy and fallback (disaster recovery, support access, CDN). The top level is all data exclusively in the EU with no third-country fallback.",
          "answers": [
            {
              "label": "1. Data location largely unknown and includes third countries without controls",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Data partly in the EU, significant reliance on third countries and limited control",
              "value": 50.0,
              "seal": 0
            },
            {
              "label": "3. Data mainly in the EU, some third-country use with standard safeguards",
              "value": 100.0,
              "seal": 1
            },
            {
              "label": "4. Data in the EU by default, tightly controlled exceptions",
              "value": 150.0,
              "seal": 1
            },
            {
              "label": "5. All data exclusively in the EU with no third-country fallback",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-3-q5",
          "number": 5,
          "text": "AI services - extent to which AI models and data pipelines are developed, trained, hosted, and governed under EU control, minimizing dependence on non-EU technology stacks.",
          "help": "How far AI models and data pipelines are developed, trained, hosted and governed under EU control, including the chips/accelerators used. Higher levels reduce dependence on non-EU models and hardware (EU-origin models and chips at the top).",
          "answers": [
            {
              "label": "Non-EU or undetermined: Black-box AI, restricted chips",
              "value": 0.0,
              "seal": 2
            },
            {
              "label": "Mostly non-EU dependencies: Licensed AI, chip dependency",
              "value": 50.0,
              "seal": 2
            },
            {
              "label": "Mixed Control with alternatives: Auditable or open source AI, foreign chips",
              "value": 100.0,
              "seal": 2
            },
            {
              "label": "EU-led AI, foreign accelerators",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "EU-origin models and chips - no dependencies from outside EU",
              "value": 200.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-4",
      "id": "operational",
      "name": "Operational Sovereignty",
      "description": "Operational sovereignty measures the practical ability of EU actors to run, support, and evolve a technology independently of foreign control. It focuses on continuity of operations, skill availability, and resilience against external dependencies.",
      "weight": 0.15,
      "questions": [
        {
          "id": "sov-4-q1",
          "number": 1,
          "text": "Portability & Interoperability - ease of migrating workloads or integrating with alternative EU-controlled solutions without vendor lock-in.",
          "help": "How easily workloads and data can be migrated to alternative EU-controlled solutions without lock-in — from no portability guarantees, through documented export methods and migration services, to already running on sovereign infrastructure.",
          "answers": [
            {
              "label": "1. No guarantees are provided for data or workload portability",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Data export and workload portability is provided on a \"best-effort\" basis",
              "value": 41.75,
              "seal": 1
            },
            {
              "label": "3. Standard documented methods for data export are available",
              "value": 83.5,
              "seal": 4
            },
            {
              "label": "4. Formal migration services are available to assist with moving data and workloads",
              "value": 125.25,
              "seal": 4
            },
            {
              "label": "5. Solution already deployed on sovereign infrastructure",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-4-q2",
          "number": 2,
          "text": "Ability to Operate Without Foreign Dependencies - capacity for EU operators to manage, maintain, and support the technology without requiring non-EU vendor involvement",
          "help": "Whether EU-based teams can run, maintain and support the technology without requiring non-EU vendor involvement. Judge by who actually performs critical operations, not just where the contract sits.",
          "answers": [
            {
              "label": "1. Critical operational services are delivered by non-EU teams",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Operational services are partially sourced from within the EU",
              "value": 41.75,
              "seal": 1
            },
            {
              "label": "3. Operational responsibilities are balanced between EU and non-EU teams",
              "value": 83.5,
              "seal": 3
            },
            {
              "label": "4. Operational services are predominantly delivered by EU-based teams",
              "value": 125.25,
              "seal": 3
            },
            {
              "label": "5. The entire technology stack is managed and supported by a fully EU-based team",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-4-q3",
          "number": 3,
          "text": "Skill Availability- existence of an EU-based talent pool with the expertise to operate and sustain the service.",
          "help": "Availability of an EU-based talent pool able to operate and sustain the service. Higher levels mean staff are EU-based (and, at the top, security-cleared) rather than escalating to non-EU teams.",
          "answers": [
            {
              "label": "Global team, mainly non-EU",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Mixed, majority outside EU",
              "value": 41.75,
              "seal": 1
            },
            {
              "label": "Majority EU, escalation abroad",
              "value": 83.5,
              "seal": 3
            },
            {
              "label": "All EU staff",
              "value": 125.25,
              "seal": 3
            },
            {
              "label": "100% EU staff + clearance",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-4-q4",
          "number": 4,
          "text": "Support Channels - assurance that operational support is delivered from within the EU and subject exclusively to EU/EEA legal frameworks",
          "help": "Where operational support is delivered from and which law governs it. Top level: all support staff in the EU holding relevant security clearances; lower levels involve non-EU support or escalation outside the EU.",
          "answers": [
            {
              "label": "1. The support team is global with the majority of staff located outside the EU",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. The team is mixed but the majority of support staff reside outside the EU",
              "value": 41.75,
              "seal": 2
            },
            {
              "label": "3. The majority of support staff are in the EU but escalations are handled by non-EU teams",
              "value": 83.5,
              "seal": 3
            },
            {
              "label": "4. All support staff are located within the EU",
              "value": 125.25,
              "seal": 3
            },
            {
              "label": "5. All support staff are located within the EU and hold relevant security clearances",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-4-q5",
          "number": 5,
          "text": "Documentation & Knowledge Transfer - availability of full technical documentation, source code, and operational know-how enabling long-term autonomy.",
          "help": "Where technical documentation, source code and operational know-how are stored and managed, and whether this enables long-term autonomy. Higher levels keep content, metadata and backups in the EU with EU-only privileged access.",
          "answers": [
            {
              "label": "1. Global/non-EU exposure - Documentation/knowledge is stored or managed outside EU and may be subject to non-EU jurisdiction or access",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. EU optional, not enforced - EU storage is available as an option, but it is not enforced",
              "value": 41.75,
              "seal": 2
            },
            {
              "label": "3. EU primary with non-EU fallback - Stored/managed in the EU by default, but some storage/replication/access outside the EU may occur (e.g., disaster recovery/support)",
              "value": 83.5,
              "seal": 4
            },
            {
              "label": "4. EU-only primary repositories - All primary documentation and knowledge repositories are stored in the EU (no routine non-EU storage/processing)",
              "value": 125.25,
              "seal": 4
            },
            {
              "label": "5. EU-only end-to-end - Content, metadata, and backups/replicas are stored in the EU and privileged administration/support access is restricted to EU-based staff under EU jurisdiction",
              "value": 167.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-4-q6",
          "number": 6,
          "text": "Subcontractor & Suppliers jurisdiction - location and legal control of critical suppliers or subcontractors involved in service delivery.",
          "help": "Location and legal control of the critical subcontractors and suppliers in the delivery chain, and what happens to the service if they are cut off — mirroring the resilience scale from immediate shutdown to full autonomy.",
          "answers": [
            {
              "label": "1. Immediate shutdown of the service is expected",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Service would likely stop but with a delay to provide time for customer reaction",
              "value": 41.75,
              "seal": 2
            },
            {
              "label": "3. Can continue temporarily based on contractual agreement with EC",
              "value": 83.5,
              "seal": 3
            },
            {
              "label": "4. Ability to source alternative suppliers or internalise key functions",
              "value": 125.25,
              "seal": 3
            },
            {
              "label": "5. Full autonomy and continuity",
              "value": 167.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-5",
      "id": "supply_chain",
      "name": "Supply Chain Sovereignty",
      "description": "Supply chain sovereignty evaluates the geographic origin, transparency, and resilience of the technology supply chain, focusing on the extent to which critical components and processes remain under EU control   or exposed to non-EU dependencies.",
      "weight": 0.1,
      "questions": [
        {
          "id": "sov-5-q1",
          "number": 1,
          "text": "Origin of Components - geographic source of key physical parts",
          "help": "Geographic source and disclosure of key physical parts (CPUs, GPUs, storage) — from no disclosure, through transparency with exceptions, to EU-certified provenance.",
          "answers": [
            {
              "label": "No disclosure",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Partial disclosure",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "Transparent with exceptions",
              "value": 71.5,
              "seal": 3
            },
            {
              "label": "Full transparency",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "EU-certified provenance",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-5-q2",
          "number": 2,
          "text": "Origin of Components: Manufacturing Location - countries where hardware is manufactured or assembled",
          "help": "Where hardware is actually manufactured or assembled, and the audit rights over it. Top level: exclusively designed and built by EU teams; bottom: fully foreign 'black box'.",
          "answers": [
            {
              "label": "Fully foreign, black box",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Foreign origin, partial disclosure",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "Mixed sourcing, EU audit rights",
              "value": 71.5,
              "seal": 3
            },
            {
              "label": "Build by EU Teams, on the basis of a foreign code",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "Exclusive designed and build by EU Teams",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-5-q3",
          "number": 3,
          "text": "Origin of Components - jurisdiction and provenance of embedded code controlling hardware, firmwares",
          "help": "Jurisdiction and provenance of the embedded code/firmware that controls the hardware — focuses on transparency and disclosure of who controls that low-level code.",
          "answers": [
            {
              "label": "No disclosure",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "Partial disclosure",
              "value": 35.75,
              "seal": 4
            },
            {
              "label": "Transparent with exceptions",
              "value": 71.5,
              "seal": 4
            },
            {
              "label": "Full transparency",
              "value": 107.25,
              "seal": 4
            },
            {
              "label": "EU-certified provenance",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-5-q4",
          "number": 4,
          "text": "Origin of Software (all)  - where and by whom software is architected and programmed",
          "help": "Where and by whom the software is architected and programmed. Higher levels mean core and essential parts (and ultimately all of it) are designed and maintained by EU teams, versus a foreign 'black box'.",
          "answers": [
            {
              "label": "1. Software is of fully foreign origin with no transparency ('black box')",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Software is of foreign origin with partial disclosure on its development",
              "value": 35.75,
              "seal": 2
            },
            {
              "label": "3. Core and essential parts of the software are designed and maintained by EU teams",
              "value": 71.5,
              "seal": 3
            },
            {
              "label": "4. A large majority of the software is designed and maintained by EU teams",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "5. The software is exclusively designed and maintained by EU teams",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-5-q5",
          "number": 5,
          "text": "Origin of Software (all) - location and jurisdiction governing software packaging, distribution, and updates.",
          "help": "Who controls and executes the build/release/deployment pipeline (administration, code signing, approvals) and under which jurisdiction. Top level: EU control and execution with EU-enforced policy/security gates.",
          "answers": [
            {
              "label": "1. Non-EU control & execution - Build/release/deployment is executed and governed by non-EU teams, with pipeline control and approvals under non-EU jurisdiction",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. EU control, non-EU execution - Execution is performed by non-EU teams, but pipeline administration and final release approvals are under EU jurisdiction",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "3. Non-EU control, EU execution - Execution is performed by EU teams, but pipeline administration and/or final release approvals (incl. signing) are under non-EU jurisdiction",
              "value": 71.5,
              "seal": 3
            },
            {
              "label": "4. EU control & execution - Build/release/deployment is executed by EU teams and governed from within the EU (pipeline administration, signing, approvals)",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "5. EU control and EU policy gates - As (4), plus EU-based compliance/security gates enforced in the pipeline (e.g., signing under your control, vulnerability checks, segregation of duties, auditable approvals)",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-5-q6",
          "number": 6,
          "text": "Single Point of Dependency - degree of reliance on non-EU vendors, facilities, or proprietary technologies",
          "help": "Reliance on individual non-EU vendors, facilities or proprietary technologies in critical versus non-critical services, and whether that reliance is documented. Top level: no dependency on any non-EU vendor or facility.",
          "answers": [
            {
              "label": "Only non-EU vendors or facilities involved",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Mostly non-EU vendors or facilities involved in critical services, non documented",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "Few non-EU vendors or facilities involved in critical services, non documented, or non-EU vendors/facilities transparently documented",
              "value": 71.5,
              "seal": 2
            },
            {
              "label": "Few non-EU vendors or facilities involved in non-critical services, documented",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "No depedency on non-EU vendor or facility",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-5-q7",
          "number": 7,
          "text": "Supply Chain Transparency - visibility into the entire supplier and sub-supplier chain, including audit rights.",
          "help": "Visibility into the full supplier and sub-supplier chain, including audit rights — from no audit rights, through critical suppliers auditable, to all suppliers and subcontractors auditable.",
          "answers": [
            {
              "label": "No suppliers can be audited",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Some suppliers and subcontractors can be audited",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "Critical suppliers and subcontractors can be audited",
              "value": 71.5,
              "seal": 2
            },
            {
              "label": "Most suppliers and subcontractors can be audited",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "All suppliers and subcontractors can be audited",
              "value": 143.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-6",
      "id": "technology",
      "name": "Technology Sovereignty",
      "description": "Technology sovereignty evaluates the degree of openness, transparency, and independence in the underlying technological stack, ensuring EU actors can interoperate, audit, and evolve solutions without lock-in to foreign proprietary systems.",
      "weight": 0.15,
      "questions": [
        {
          "id": "sov-6-q1",
          "number": 1,
          "text": "Interoperability & Open interfaces - ability to integrate with other technologies through well-documented and non-proprietary APIs or protocols.",
          "help": "Whether you can integrate via well-documented, non-proprietary APIs and protocols. Higher levels predominantly follow recognised open standards (ISO/IEC, ETSI/CEN, IETF/W3C) and open formats enabling portability, versus closed proprietary interfaces.",
          "answers": [
            {
              "label": "1. Closed proprietary interfaces - Integrations rely on closed or proprietary interfaces and formats controlled by the vendor",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Restricted proprietary APIs - Some vendor APIs exist, but they are limited/restricted (access, scope, licensing) and interoperability remains vendor-controlled",
              "value": 50.0,
              "seal": 1
            },
            {
              "label": "3. Mixed (partial openness) - Key interfaces are documented and partly standards-based, but important functions or data formats remain proprietary/vendor-specific",
              "value": 100.0,
              "seal": 2
            },
            {
              "label": "4. Standards-based and broadly compatible - Interfaces and data formats predominantly follow recognised open standards (e.g., ETSI/CEN/CENELEC, ISO/IEC, IETF/W3C) with stable versioning and full documentation",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "5. Open-by-default with portability - All critical functions are accessible via open, well-documented, non-proprietary APIs and standard formats, with published specifications and minimal vendor-specific dependencies enabling easy third-party integration",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-6-q2",
          "number": 2,
          "text": "Open Standards Compliance - extent to which the solution adheres to publicly governed and widely adopted standards, reducing dependency on single vendors",
          "help": "Whether core services (identity/IAM, data formats, messaging, logging, integration) follow publicly governed open standards under a formal policy. Top level: a formal policy mandates open standards for all core services.",
          "answers": [
            {
              "label": "1. No open standards - Core services (e.g., identity and access management, data formats, messaging, security, logging, integration protocols) rely mainly on proprietary technologies",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Ad hoc use - Open standards are used inconsistently on a case-by-case basis, without documented rationale or governance",
              "value": 50.0,
              "seal": 0
            },
            {
              "label": "3. Partial core adoption - Open standards are used and documented for some core services, while other core services remain proprietary/vendor-specific",
              "value": 100.0,
              "seal": 2
            },
            {
              "label": "4. Policy for most core services - A formal policy mandates and documents open standards for most core services, with managed exceptions",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "5. Policy for all core services - A formal policy mandates and documents open standards for all core services",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-6-q3",
          "number": 3,
          "text": "Open Source Availability - whether software is accessible under open licenses, with rights to audit, modify, and redistribute, ensuring transparency and adaptability",
          "help": "Whether the software is open source with rights to audit, modify and redistribute, and how its governance is structured. Top level: fully open source governed by an independent or EU-based entity, enabling handover; bottom: fully closed and vendor-controlled.",
          "answers": [
            {
              "label": "1. The software is fully closed-source with no rights to audit or modify and its governance is vendor-controlled",
              "value": 0.0,
              "seal": 2
            },
            {
              "label": "2. Source code is available for review but modification and handover rights are under very strict conditions",
              "value": 50.0,
              "seal": 2
            },
            {
              "label": "3. The software is open source , permitting modification and redistribution, but governance is centralised (e.g., single-company or non-open foundation), limiting strategic autonomy or smooth handover",
              "value": 100.0,
              "seal": 3
            },
            {
              "label": "4. The software is open source with significant EU contributions but governance is restricted and handover is possible",
              "value": 150.0,
              "seal": 4
            },
            {
              "label": "5. Fully open-source software is governed by an independent or EU-based entity, granting full rights to audit, modify, redistribute, and seamlessly transfer stewardship",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-6-q4",
          "number": 4,
          "text": "Service Architecture Transparency - visibility into the design and functioning of the service, including architectural documentation, data flows, and dependencies",
          "help": "Visibility into the design, data flows and dependencies of the service (architectural documentation). Higher levels provide public insight and, at the top, let customers contribute changes.",
          "answers": [
            {
              "label": "No insight provided",
              "value": 0.0,
              "seal": 2
            },
            {
              "label": "Insight accessible during audits",
              "value": 50.0,
              "seal": 2
            },
            {
              "label": "Some public insight exists (all)",
              "value": 100.0,
              "seal": 3
            },
            {
              "label": "Large corpus of public insight exists (all)",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "Customers can contribute to adapt and enhance the service",
              "value": 200.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-6-q5",
          "number": 5,
          "text": "HPC Soveriegnty - degree of European independence in high-performance computing capabilities, including processors, accelerators, and software ecosystems.",
          "help": "European independence in high-performance computing — processors, accelerators and software ecosystem — from imported black-box HPC, through EU-hosted/foreign-stack and EU co-design, to EU design + EU fabrication + EU operation.",
          "answers": [
            {
              "label": "Imported black-box HPC computers",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "EU-hosted, foreign stack",
              "value": 50.0,
              "seal": 3
            },
            {
              "label": "Co-designed or integrated in EU",
              "value": 100.0,
              "seal": 3
            },
            {
              "label": "EU processor IP, non-EU fabs",
              "value": 150.0,
              "seal": 3
            },
            {
              "label": "EU design + EU fab + EU ops",
              "value": 200.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-7",
      "id": "security",
      "name": "Security & Compliance Sovereignty",
      "description": "Security & Compliance sovereignty measures the extent to which security operations, compliance obligations, and resilience measures are controlled within the EU  , ensuring independence from foreign jurisdictions and long-term operational assurance.",
      "weight": 0.15,
      "questions": [
        {
          "id": "sov-7-q1",
          "number": 1,
          "text": "Security Certification - attainment of EU and internationally recognized certifications (all)",
          "help": "Level of recognised security assurance/certification, on the framework's evaluation-assurance ladder (e.g. EAL2 up to EAL4-5). Choose the highest level independently attained.",
          "answers": [
            {
              "label": "ELA0",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "ELA1",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "EAL2",
              "value": 71.5,
              "seal": 2
            },
            {
              "label": "ELA3",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "EAL4-5",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-7-q2",
          "number": 2,
          "text": "EU Regulatory compliance - demonstrable adherence to GDPR, NIS2, DORA, and other EU frameworks",
          "help": "Demonstrable adherence to GDPR, NIS2, DORA and other EU frameworks. Higher levels require verified, independently audited compliance rather than informal or partial practices.",
          "answers": [
            {
              "label": "1. No evident adherence to any EU Regulations",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "2. Limited compliance to some well-known EU Regulations (basic practices exist but informal, incomplete, or non-systematic)",
              "value": 35.75,
              "seal": 4
            },
            {
              "label": "3. Moderate compliance to some well-know EU Regulations (controls exist but gaps remain; compliance not fully demonstrated)",
              "value": 71.5,
              "seal": 4
            },
            {
              "label": "4. Partial compliance to most of the well-known EU Regulations (requirements implemented and operational with minor exceptions)",
              "value": 107.25,
              "seal": 4
            },
            {
              "label": "5. Fully compliant to all well-know EU regulations (verified compliance, independently audited)",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-7-q3",
          "number": 3,
          "text": "EU-based SOC & incident handling - security operations centers and response teams operating exclusively under EU jurisdiction.",
          "help": "Whether security operations and incident response run exclusively under EU jurisdiction. Top level: the full incident lifecycle is handled by EU teams participating in ENISA information-sharing; lower levels escalate to non-EU teams.",
          "answers": [
            {
              "label": "1. The SOC and incident response teams are located outside the EU",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. A hybrid model is used with SOC functions split between EU and non-EU locations",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "3. The primary SOC is in the EU but incidents may be escalated to non-EU teams",
              "value": 71.5,
              "seal": 1
            },
            {
              "label": "4. The entire incident lifecycle is handled by teams operating exclusively within the EU. Threat intelligence and incident data obtained mostly via EU sources",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "5. The full incident lifecycle is handled by EU-based teams with active participation in ENISA's information sharing frameworks. Threat intelligence and incident data are gathered worldwide",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-7-q4",
          "number": 4,
          "text": "Control over security monitoring/logging - customer or EU authority ability to oversee logs, alerts, and monitoring functions directly.",
          "help": "Whether the customer or an EU authority can directly oversee logs, alerts and monitoring, and where logs are stored. Top level: full access to immutable, tamper-proof logs stored exclusively in the EU.",
          "answers": [
            {
              "label": "1. The provider retains full control over all security logs and monitoring",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Customers receive periodic reports based on security logs",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "3. Customers have access to a basic portal for monitoring",
              "value": 71.5,
              "seal": 1
            },
            {
              "label": "4. Customers have full direct access to their security monitoring and logs which are stored in the EU",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "5. Customers have full access to immutable tamper-proof logs stored exclusively within the EU",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-7-q5",
          "number": 5,
          "text": "Disclosure of incidents - transparent, timely, and EU-compliant reporting of breaches or vulnerabilities",
          "help": "Transparency, timeliness and EU-compliance of breach/vulnerability reporting and cooperation with EU CSIRTs. Higher levels mean real-time, audit-backed disclosure and proven readiness for investigations.",
          "answers": [
            {
              "label": "1. No compliance - ad-hoc or absent breach reporting workflow, with no possibility to collaborate with EU CSIRTs or to support EU-led investigations",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "2. Limited compliance - reporting is reactive with limited transparency and unguaranteed timelines;  CSIRT cooperation possible on best-effort basis",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "3. Moderate compliance - GDPR/NIS2-aligned reporting procedures in place with vulnerabilities and breaches communicated within mandated timelines; CSIRT cooperation available but not real-time",
              "value": 71.5,
              "seal": 2
            },
            {
              "label": "4. Partial compliance - there is a monitored reporting flow with internal SLAs equal or below regulatory maximums; contractually prepared to support EU-directed investigations; data sharing with EU CSIRTs available but not in real-time",
              "value": 107.25,
              "seal": 3
            },
            {
              "label": "5. Full compliance - full EU-compliant breach disclosure with real-time data sharing to EU CSIRTs with audit-backed processes, proactive vulnerability disclosure and threat intel sharing; proven readiness for investigations",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-7-q6",
          "number": 6,
          "text": "Maintenance Autonomy - ability to develop, test, and apply security patches independently of non-EU vendors",
          "help": "Ability to develop, test and apply security patches independently of non-EU vendors. Higher levels let the customer deploy patches independently (with appropriate testing) rather than being tied to vendor schedules.",
          "answers": [
            {
              "label": "1. No autonomy in the deployment of security patches",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Limited Autonomy - security patches are deployed according to vendor schedules; basic testing is possible",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "3. Moderate Autonomy - security patches are deployed with sufficient notice to the customer and testing is possible, except for zero-day patching",
              "value": 71.5,
              "seal": 4
            },
            {
              "label": "4. High Autonomy - security patches can be deployed independently by the customer, without customers' checks",
              "value": 107.25,
              "seal": 4
            },
            {
              "label": "5. Full Autonomy - security patches can be deployed independently by the customer, with customers' checks",
              "value": 143.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-7-q7",
          "number": 7,
          "text": "Auditability - capacity for EU entities to perform independent security and compliance audits with full access.",
          "help": "Whether independent EU entities can perform security and compliance audits with full access — from vendor-only access to full audit rights for any independent entity.",
          "answers": [
            {
              "label": "1. No access to entities other than the vendor",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "2. Limited access to independent entities to the data provided by the vendor",
              "value": 35.75,
              "seal": 1
            },
            {
              "label": "3. Partial control by independent entities on the data provided by the vendor",
              "value": 71.5,
              "seal": 1
            },
            {
              "label": "4. High control by independent entities to request data from the vendor",
              "value": 107.25,
              "seal": 1
            },
            {
              "label": "5. Full control by any idependent entity to perform security and compliance audits",
              "value": 143.0,
              "seal": 4
            }
          ]
        }
      ]
    },
    {
      "code": "SOV-8",
      "id": "sustainability",
      "name": "Environmental Sustainability",
      "description": "Environmental sustainability assesses autonomy and resilience of cloud services over the long term in relation to energy usage, dependency and raw material scarcity.",
      "weight": 0.05,
      "questions": [
        {
          "id": "sov-8-q1",
          "number": 1,
          "text": "Energy efficiency - adoption of energy-efficient infrastructure (all) and measurable improvement targets.",
          "help": "Data-centre energy efficiency, measured by Power Usage Effectiveness (PUE) with improvement targets — lower PUE is better; the top level is roughly PUE < 1.2, EU-verified.",
          "answers": [
            {
              "label": "PUE > 0",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "PUE < 3",
              "value": 62.5,
              "seal": 1
            },
            {
              "label": "PUE < 1.5 + roadmap",
              "value": 125.0,
              "seal": 4
            },
            {
              "label": "PUE < 1.3",
              "value": 187.5,
              "seal": 4
            },
            {
              "label": "PUE < 1.2 EU verified",
              "value": 250.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-8-q2",
          "number": 2,
          "text": "Hardware reuse & recycling - circular economy practices ensuring reuse, refurbishment, and responsible end-of-life treatment of hardware.",
          "help": "Circular-economy practices for reuse, refurbishment and responsible end-of-life of hardware. Top level: an EU-certified lifecycle; bottom: no policy.",
          "answers": [
            {
              "label": "No policy",
              "value": 0.0,
              "seal": 0
            },
            {
              "label": "Circular economy EU-aligned",
              "value": 62.5,
              "seal": 0
            },
            {
              "label": "Documented program",
              "value": 125.0,
              "seal": 3
            },
            {
              "label": "Circular economy EU-aligned",
              "value": 187.5,
              "seal": 4
            },
            {
              "label": "EU-certified lifecycle",
              "value": 250.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-8-q3",
          "number": 3,
          "text": "Environmental impact reporting - transparent measurement and disclosure of carbon emissions, water usage, and other sustainability indicators.",
          "help": "Transparency of carbon, water and other sustainability metrics. Higher levels use a detailed EU methodology and, at the top, EU-audited reporting.",
          "answers": [
            {
              "label": "No reporting",
              "value": 0.0,
              "seal": 1
            },
            {
              "label": "Detailed EU methodology",
              "value": 62.5,
              "seal": 1
            },
            {
              "label": "Annual report",
              "value": 125.0,
              "seal": 2
            },
            {
              "label": "Detailed EU methodology",
              "value": 187.5,
              "seal": 3
            },
            {
              "label": "EU-audited reporting",
              "value": 250.0,
              "seal": 4
            }
          ]
        },
        {
          "id": "sov-8-q4",
          "number": 4,
          "text": "Energy supplies - sourcing of renewable or low-carbon energy to power infrastructure and operations",
          "help": "Sourcing of renewable or low-carbon energy for infrastructure and operations. Top level: only green EU energy supplies; bottom: non-traceable energy.",
          "answers": [
            {
              "label": "Non traceable",
              "value": 0.0,
              "seal": 4
            },
            {
              "label": "Only EU energy supplies",
              "value": 62.5,
              "seal": 4
            },
            {
              "label": "Mix of EU and non-EU supplies",
              "value": 125.0,
              "seal": 4
            },
            {
              "label": "Only EU energy supplies",
              "value": 187.5,
              "seal": 4
            },
            {
              "label": "Only green EU energy supplies",
              "value": 250.0,
              "seal": 4
            }
          ]
        }
      ]
    }
  ]
};
