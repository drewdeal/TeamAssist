import {dateFormat} from "./frpHelpers";
import {
  chatStatus, projectStatus, factStatus, includeTriggers, patchTypes,
  streamKinds, loginLevels, soundPrefs
} from "./uiConfig";

function today (){
  return dateFormat(0);
}

const restreamFormConfig = [
  { label: "Select Restream Type", type: "select", name: "restreamType", opts: {
    dump: "Dump Events", filter: "Filter Events", snap: "Make snapshot", custom: "Custom"
  } },
  { label: "Target stream prefix (ie. 'm_') Make SURE full target stream does not exist!", type: "text", name: "streamPreTag" },
  { label: "Event ID's to filter: We'll use .split(/\\D+/)", type: "textarea", name: "filters", rows: 2, cols: 50 },
  { label: "RelatedID tag on", name: "targetEvent" }
]

const mdTemplates = {
  episode: "### Sitting\n\n### Decisions\n\n### Corrections\n\n### Open loops\n\n### Entity writes (project / profile)\n",
  recall: "### Always-on\n- memory-rules HEAD\n- user HEAD\n- live index\n- current chat since last flush\n\n### Summoned\n- matching project HEAD\n- diffs from 1-2 indexed chats\n"
}

const validRoutes = {
  home: { meta: {
    name: "grokmem — multi-stream memory",    menuName: "Home",
    panelFn: "Home",
  }},

  index: {
    meta: {
      name: "Index stream — always loaded", menuName: "Index",
      hstream: "index",
      menuLevel: 1,
      primeTab: "Live catalog",
      color: "#4bb529",
      hardFilt: { status: ["indexed", "sealed"] }
    },
    archived: { meta: {
      name: "Index archive (cold catalog)",
      hstream: "index",
      menuLevel: 3,
      tabPage: true,
      hardFilt: { status: ["draft"] },
      color: "#89a0c3"
    }}
  },

  chats: {
    meta: {
      name: "Chat streams", menuName: "Chats",
      hstream: "chats",
      menuLevel: 1,
      primeTab: "Indexed sittings",
      color: "#57a1e4",
      hardFilt: { status: ["indexed", "sealed"] }
    },
    draft: { meta: {
      name: "Draft chats (working trees)", menuName: "Drafts",
      hstream: "chats",
      menuLevel: 2,
      tabPage: true,
      hardFilt: { status: ["draft"] },
      color: "#89a0c3"
    }},
    sealed: { meta: {
      name: "Sealed chats",
      hstream: "chats",
      menuLevel: 3,
      tabPage: true,
      hardFilt: { status: ["sealed"] },
      color: "#f57c00"
    }},
    id: { meta: {
      name: "Chat stream",
      menuLevel: 2,
      hstream: "chats",
      panelFn: "teamPanel",
      subUrl: { hstream: "index" }
    }},
    modChat: {
      meta: {
        name: "Include chat",
        hstream: "chats",
        menuLevel: 2,
        panel: "Promote a sitting into memory (explicit include)",
        panelFn: "formPanel",
        formConfig: [
          { pane: "Identity", name: "identity", color: "#89a0c3"},
          { label: "Chat id", type: "text", name: "chatId", req: "Stable id for this sitting" },
          { label: "Title", type: "text", name: "title", req: "Short catalog title" },
          { label: "Status", type: "select", name: "status", opts: chatStatus },
          { label: "Include trigger", type: "select", name: "includeTrigger", opts: includeTriggers },
          { pane: "Episode patch (not a dump)", name: "episode", color: "#57a1e4"},
          { label: "One liner", type: "text", name: "oneLiner", size: 72, maxlength: 160 },
          { label: "Episode summary", type: "textarea", name: "episodeSummary", rows: 8, cols: 72, markDown: true, tmplLoader: mdTemplates.episode },
          { label: "Actors", type: "text", name: "actors" },
          { label: "Open loop count", type: "number", name: "openLoopCount", min: 0, step: 1 },
          { pane: "Dual-write targets", name: "dual", color: "#4bb529"},
          { label: "Linked projects (comma)", type: "text", name: "projects", title: "Writes the same patch onto those project streams" },
          { label: "Write profile patch?", type: "checkbox", name: "writeUser", value: 1 },
          { label: "Store raw transcript blob?", type: "checkbox", name: "storeBlob", value: 1, title: "Optional. Recall never reads the blob." }
        ]
      },
      id: { meta: {
        name: "Flush chat", menuName: "Flush",
        buttonText: "Append episode commit",
        additionalFormConfig: [
          { pane: "Periodic flush", name: "flush", color: "#0eadb5"},
          { label: "Patch type", type: "select", name: "patchType", opts: patchTypes },
          { label: "Parent commit", type: "text", name: "parentCommit" },
          { label: "Patch body", type: "textarea", name: "patchBody", rows: 10, cols: 72, markDown: true, journal: true },
          { label: "Seal after this flush", type: "checkbox", name: "sealAfter", value: 1 },
          { pane: "Index row", name: "indexWrite", color: "#4bb529"},
          { label: "Update index on flush", type: "checkbox", name: "touchIndex", value: 1 },
          { label: "Permanently DELETE", type: "checkbox", name: "statusDELETE", value: 1 }
        ],
        panel: "Append a structured patch to this chat stream and optionally the index"
      }}
    }
  },

  projects: {
    meta: {
      name: "Entity / project streams (belief HEAD)", menuName: "Projects",
      hstream: "projects",
      menuLevel: 1,
      primeTab: "Active entities",
      color: "#4bb529",
      hardFilt: { status: ["active"] }
    },
    parked: { meta: {
      name: "Parked entities",
      hstream: "projects",
      menuLevel: 2,
      tabPage: true,
      hardFilt: { status: ["parked"] },
      color: "#57a1e4"
    }},
    projArchived: { meta: {
      name: "Archived entities",
      hstream: "projects",
      menuLevel: 3,
      tabPage: true,
      hardFilt: { status: ["archived"] },
      color: "#f57c00"
    }},
    id: { meta: {
      name: "Project HEAD",
      menuLevel: 2,
      hstream: "projects",
      panelFn: "teamPanel",
      subUrl: { hstream: "chats" }
    }},
    modProject: {
      meta: {
        name: "Add entity stream",
        hstream: "projects",
        menuLevel: 2,
        panel: "Create a project or entity stream for current beliefs",
        panelFn: "formPanel",
        formConfig: [
          { pane: "Entity", name: "entity", color: "#89a0c3"},
          { label: "Stream key (project-teamassist)", type: "text", name: "streamKey", req: "Stable stream name" },
          { label: "Display name", type: "text", name: "name", req: "Name required" },
          { label: "Kind", type: "select", name: "kind", opts: streamKinds },
          { label: "Status", type: "select", name: "status", opts: projectStatus },
          { label: "One-line HEAD", type: "textarea", name: "headBlurb", rows: 3, cols: 72 }
        ]
      },
      id: { meta: {
        name: "Append entity patch", menuName: "Patch entity",
        buttonText: "Project to HEAD",
        additionalFormConfig: [
          { pane: "Belief patch", name: "belief", color: "#57a1e4"},
          { label: "Fact key", type: "text", name: "factKey", req: "Identity of the belief" },
          { label: "Fact status", type: "select", name: "factStatus", opts: factStatus },
          { label: "Patch type", type: "select", name: "patchType", opts: patchTypes },
          { label: "New value", type: "textarea", name: "value", rows: 6, cols: 72, markDown: true },
          { label: "Prior value (diff)", type: "textarea", name: "priorValue", rows: 4, cols: 72, journal: true },
          { label: "Source chat id", type: "text", name: "sourceChatId" },
          { label: "Source commit", type: "text", name: "sourceCommit" },
          { pane: "Lifecycle", name: "life", color: "#ffa726"},
          { label: "Fork new entity from this HEAD", type: "text", name: "forkProject", tooltipPos: "bottom", tooltip: "Creates a child entity stream. Does not mutate this HEAD." },
          { label: "Permanently DELETE", type: "checkbox", name: "statusDELETE", value: 1 }
        ],
        panel: "Append a belief patch. HEAD is the fold of this stream."
      }}
    }
  },

  profile: {
    meta: {
      name: "User profile HEAD (user-drew)", menuName: "Profile",
      hstream: "users",
      menuLevel: 1,
      color: "#0eadb5"
    },
    modProfile: {
      meta: {
        name: "Seed profile",
        hstream: "users",
        menuLevel: 2,
        panel: "Stable facts about the human — always loaded with the index",
        panelFn: "formPanel",
        formConfig: [
          { pane: "Identity", name: "basic"},
          { label: "Display name", type: "text", name: "displayName", req: "Name required" },
          { label: "Stream key", type: "text", name: "streamKey" },
          { label: "Access Level", accessLevel: 3, sessValFilter: true, type: "select",
            name: "loginLevel", opts: loginLevels, numIndex: true }
        ]
      },
      id: { meta: {
        name: "Patch profile", menuName: "Patch profile",
        menuLevel: 2,
        additionalFormConfig: [
          { pane: "Always-on facts", name: "prefs"},
          { label: "Style / constraints", type: "textarea", name: "style", rows: 6, cols: 72, journal: true },
          { label: "Tools", type: "textarea", name: "tools", rows: 3, cols: 72 },
          { label: "Hard constraints", type: "textarea", name: "constraints", rows: 4, cols: 72, journal: true },
          { label: "Sound Preference", type: "select", name: "soundPref", opts: soundPrefs }
        ],
        panel: "Profile is an entity stream loaded every session"
      }}
    }
  },

  rules: {
    meta: {
      name: "memory-rules constitution", menuName: "Rules",
      hstream: "rules",
      menuLevel: 1,
      color: "#333"
    },
    modRules: {
      meta: {
        name: "Set rules",
        hstream: "rules",
        menuLevel: 2,
        panel: "How grokmem records. Always loaded. Short.",
        panelFn: "formPanel",
        formConfig: [
          { pane: "Constitution", name: "const", color: "#333"},
          { label: "Rule id", type: "text", name: "ruleId", req: "1" },
          { label: "Rule body", type: "textarea", name: "body", rows: 12, cols: 72, markDown: true, tmplLoader: mdTemplates.recall },
          { label: "Active", type: "checkbox", name: "active", value: 1 }
        ]
      },
      id: { meta: {
        name: "Revise rule",
        additionalFormConfig: [
          { label: "Revision note", type: "textarea", name: "revNote", rows: 3, cols: 72, journal: true }
        ]
      }}
    }
  },

  recall: {
    meta: {
      name: "Recall pack — " + today(), menuName: "Recall",
      menuLevel: 1,
      panelFn: "teamReports",
      hstream: "index",
      subUrl: {
        hstream: "projects"
      }
    }
  },

  users: {
    meta: {
      name: "Actors",      menuName: "Actors",
      menuLevel: 3,
      hstream: "users",
      hardFilt: { loginLevel: [1, 2, 3, 4, 5] },
    },
    modUser: {
      meta: {
        name: "Add actor",
        menuLevel: 3,
        hstream: "users",
        panel: "Add a human or agent that may write streams",
        panelFn: "formPanel",
        formConfig: [
          { pane: "Actor", name: "basic"},
          { label: "Preferred Display Name", type: "text", name: "displayName", req: "Required" },
          { label: "Kind", type: "select", name: "kind", opts: { human: "Human", agent: "Agent" } },
          { label: "Access Level", req: "No blocking yet.", accessLevel: 3, sessValFilter: true, type: "select",
            name: "loginLevel", opts: loginLevels, numIndex: true }
        ]
      },
      id: { meta: {
        name: "Update actor", menuName: "Add actor",
        menuLevel: 4,
        additionalFormConfig: [
          { label: "Email", type: "text", name: "email"},
          { label: "Own stream key", type: "text", name: "streamKey" },
          { label: "Sound Preference", type: "select", name: "soundPref", opts: soundPrefs}
        ],
        panel: "Actor record"
      }}
    }
  },

  admin: {
    meta: {
      name: "Admin",
      href: "",
      menuLevel: 5
    },
    teamsRestream: {
      meta: {
        name: "UTILITY — Restream",      menuName: "Restreaming",
        menuLevel: 5,
        panelFn: "restream",
        hstream: "index",
        formConfig: restreamFormConfig,
        primeTab: "Index Restream"
      },
      chatsRestream: { meta: {
        name: "Chats Restream",
        menuLevel: 5,
        panelFn: "restream",
        hstream: "chats",
        formConfig: restreamFormConfig,
        tabPage: true
      }},
      projectsRestream: { meta: {
        name: "Projects Restream",
        menuLevel: 5,
        panelFn: "restream",
        hstream: "projects",
        formConfig: restreamFormConfig,
        tabPage: true
      }},
      rulesRestream: { meta: {
        name: "Rules Restream",
        menuLevel: 5,
        panelFn: "restream",
        hstream: "rules",
        formConfig: restreamFormConfig,
        tabPage: true
      }},
      usersRestream: { meta: {
        name: "Users Restream",
        menuLevel: 5,
        panelFn: "restream",
        hstream: "users",
        formConfig: restreamFormConfig,
        tabPage: true
      }},
    },
    bulkImport: { meta: {
      name: "Bulk Stream Import",
      hstream: "index",
      menuLevel: 5,
      panel: "Dump JSON from a previous restream into grokmem",
      panelFn: "formPanel",
      formConfig: [
        { label: "Paste in JSON", req: "Must paste in valid JSON", type: "textarea", name: "bulkJson", rows: 35, cols: 68 },
        { label: "Append despite eids list", type: "checkbox", name: "override" },
        { label: "Allow Stream bypass", type: "checkbox", name: "allowNoES", title: "(no check on eventStore[hstream] in memory)" },
      ]
    }}
  },

  loginScreen: { meta: {
    menuLevel: 10,
    name: "Login",
    hstream: "users",
    postStream: "session_",
    panelFn: "formPanel",
    makeSess: "eid",
    formConfig: [
      { pane: "Session required to append streams", name: "Login"},
      { label: "Your EID", type: "text", name: "eid", req: "6" },
      { label: "Password", type: "password", name: "password", req: "8", },
    ]
  }},
  register: { meta: {
    menuLevel: 10,
    name: "Register for Access",
    hstream: "users",
    postStream: "session_",
    panelFn: "formPanel",
    makeSess: "eid",
    formConfig: [
      { pane: "Register now", name: "Register"},
      { label: "Full Name", type: "text", name: "loginName", req: "Your name is key" },
      { label: "Email", type: "text", name: "email", req: "email", title: ""},
      { label: "Your EID", type: "text", name: "eid", req: "Enter your valid Employee Number" },
      { label: "Password", type: "password", name: "password", req: "Strong local password", },
      { label: "Repeat Password", type: "password", name: "password2", req: "Confirm Password", },
    ]
  }},
  welcomeLevel: { meta: {
    menuLevel: 10,
    name: "Welcome to grokmem",
    hstream: "users",
    href: "",
    panelFn: "formPanel",
    sessPropForId: "eid",
    formConfig: [
      { pane: "What role fits you in grokmem?", name: "roleSelect"},
      { label: "Just Visiting", type: "radio", name: "levelSought", value: "1" },
      { label: "Member", type: "radio", name: "levelSought", value: "2" },
      { label: "Editor (may include chats)", type: "radio", name: "levelSought", value: "3" },
      { label: "Admin", type: "radio", name: "levelSought", value: "4" }
    ]
  }},
  cookiesBlock: { meta: {
    menuLevel: 10,
    name: "There was an Error Setting your Session Cookie",
    tmpPanel: "The SSO service ties to session creation code on our server that was not set. "
  }},
};

export {validRoutes};
