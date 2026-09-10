import {chatStatus, projectStatus, factStatus, patchTypes, streamKinds, loginLevels} from "./uiConfig";

const chatLinks = [
  { dKey: "", label: "Open", atagClasses: ".la.la-book.la-3x.tableIconLink", altVal: " ", atag: "#/chats/id/{id}", width: 30 },
  { dKey: "", label: "Flush", atagClasses: ".la.la-edit.la-3x.tableIconLink", altVal: " ", atag: "#/chats/modChat/id/{id}", width: 30 }
]

const projectLinks = [
  { dKey: "", label: "HEAD", atagClasses: ".la.la-book.la-3x.tableIconLink", altVal: " ", atag: "#/projects/id/{id}", width: 30 },
  { dKey: "", label: "Patch", atagClasses: ".la.la-edit.la-3x.tableIconLink", altVal: " ", atag: "#/projects/modProject/id/{id}", width: 30 }
]

const tableConfig = {
  recall: {
    cols: [
      { dKey: "chatId", label: "Chat", minWidth: 120 },
      { dKey: "title", label: "Title", minWidth: 180 },
      { dKey: "projects", label: "Entity hooks", minWidth: 160 },
      { dKey: "oneLiner", label: "Index one-liner", minWidth: 280 },
      { dKey: "status", label: "Status", hashMap: chatStatus }
    ],
    statusCols: [
      { dKey: "status", label: "Status", hashMap: chatStatus },
      { dKey: "projects", label: "Entity", minWidth: 160 },
      { dKey: "title", label: "Title", minWidth: 180 }
    ],
    filtersPage: { searchCol: ["title", "oneLiner", "projects"], specialRange: [500] },
    filtersExtra: {
      pivotType: { dKey: "pType", label: "Recall slice",
        opts: {
          totals: "Always-on pack",
          status: "By chat status",
          projects: "By entity hook"
        },
        width: 160
      }
    }
  },

  index: {
    cols: [
      { dKey: "chatId", label: "Chat id", sort: "asc", minWidth: 120, tdStyle: "sectionLabel", altVal: "un-id'd" },
      { dKey: "title", label: "Title", sort: "asc", minWidth: 200 },
      { dKey: "status", label: "Status", sort: "asc", hashMap: chatStatus, width: 90 },
      { dKey: "projects", label: "Projects[]", minWidth: 160 },
      { dKey: "oneLiner", label: "One liner", minWidth: 280 },
      { dKey: "openLoopCount", label: "Loops", width: 60 },
      { dKey: "actors", label: "Actors", width: 120 },
      { dKey: "lastCommit", label: "Last commit", width: 90 },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      { dKey: "", label: "", atagClasses: ".la.la-book.la-3x.tableIconLink", altVal: " ", atag: "#/chats/id/{chatId}", width: 30 }
    ],
    filtersPage: { searchCol: ["chatId", "title", "oneLiner", "projects"], specialRange: [500] },
    filtersExtra: {
      status: { dKey: "status", label: "Index status", opts: chatStatus, width: 140, getCount: true }
    }
  },

  archived: {
    cols: [
      { dKey: "chatId", label: "Chat id", sort: "asc", minWidth: 120 },
      { dKey: "title", label: "Title", minWidth: 200 },
      { dKey: "status", label: "Status", hashMap: chatStatus },
      { dKey: "oneLiner", label: "One liner", minWidth: 280 },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" }
    ],
    filtersPage: { searchCol: ["chatId", "title"], specialRange: [100, 200, 300] },
    filtersExtra: {
      status: { dKey: "status", label: "Status", opts: chatStatus, width: 140, getCount: true }
    }
  },

  chats: {
    cols: [
      { dKey: "chatId", label: "Chat id", sort: "asc", minWidth: 120, tdStyle: "sectionLabel", altVal: "un-id'd" },
      { dKey: "title", label: "Title", sort: "asc", minWidth: 200 },
      { dKey: "status", label: "Status", sort: "asc", hashMap: chatStatus, width: 90 },
      { dKey: "includeTrigger", label: "How included", width: 120 },
      { dKey: "projects", label: "Dual-write entities", minWidth: 160 },
      { dKey: "oneLiner", label: "Episode one-liner", minWidth: 260 },
      { dKey: "openLoopCount", label: "Loops", width: 60 },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      ...chatLinks
    ],
    filtersPage: { searchCol: ["chatId", "title", "oneLiner", "projects"], specialRange: [500] },
    filtersExtra: {
      status: { dKey: "status", label: "Chat status", opts: chatStatus, width: 140, getCount: true }
    }
  },

  draft: {
    cols: [
      { dKey: "chatId", label: "Chat id", sort: "asc", minWidth: 120, tdStyle: "sectionLabel" },
      { dKey: "title", label: "Working title", minWidth: 200 },
      { dKey: "status", label: "Status", hashMap: chatStatus },
      { dKey: "oneLiner", label: "Notes", minWidth: 280, tdStyle: "#modal_priors_cell.mClick.clickBg" },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      { dKey: "", label: "Include", atagClasses: ".la.la-edit.la-3x.tableIconLink", altVal: " ", atag: "#/chats/modChat/id/{id}", width: 30 }
    ],
    filtersPage: { searchCol: ["chatId", "title"], specialRange: [100, 200, 300] },
    filtersExtra: {
      status: { dKey: "status", label: "Status", opts: chatStatus, width: 140, getCount: true }
    }
  },

  sealed: {
    cols: [
      { dKey: "chatId", label: "Chat id", sort: "asc", minWidth: 120 },
      { dKey: "title", label: "Title", minWidth: 200 },
      { dKey: "projects", label: "Entities", minWidth: 160 },
      { dKey: "oneLiner", label: "Final one-liner", minWidth: 280 },
      { dKey: "eStamp", label: "Sealed", width: 60, dateFormat: "MM/DD/YY" },
      ...chatLinks
    ],
    filtersPage: { searchCol: ["chatId", "title", "projects"], specialRange: [100, 200, 300] },
    filtersExtra: {
      status: { dKey: "status", label: "Status", opts: chatStatus, width: 140, getCount: true }
    }
  },

  projects: {
    cols: [
      { dKey: "streamKey", label: "Stream", sort: "asc", minWidth: 160, tdStyle: "sectionLabel", altVal: "unnamed" },
      { dKey: "name", label: "Entity", sort: "asc", minWidth: 180 },
      { dKey: "kind", label: "Kind", hashMap: streamKinds, width: 120 },
      { dKey: "status", label: "Status", sort: "asc", hashMap: projectStatus, width: 80 },
      { dKey: "headBlurb", label: "HEAD blurb", minWidth: 280 },
      { dKey: "factKey", label: "Last fact key", width: 120 },
      { dKey: "factStatus", label: "Fact", hashMap: factStatus, width: 90 },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      ...projectLinks
    ],
    filtersPage: { searchCol: ["streamKey", "name", "headBlurb", "factKey"], specialRange: [500] },
    filtersExtra: {
      status: { dKey: "status", label: "Entity status", opts: projectStatus, width: 140, getCount: true }
    }
  },

  parked: {
    cloneParams: "projects",
    remCols: ["factKey", "factStatus"]
  },

  projArchived: {
    cloneParams: "projects",
    remCols: ["factKey"]
  },

  profile: {
    cols: [
      { dKey: "displayName", label: "Name", sort: "asc", width: 160, tdStyle: "sectionLabel" },
      { dKey: "streamKey", label: "Stream", minWidth: 140 },
      { dKey: "style", label: "Style / constraints", minWidth: 280, tdStyle: "#modal_priors_cell.mClick.clickBg" },
      { dKey: "loginLevel", label: "Access", hashMap: loginLevels },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      { dKey: "", label: "", atagClasses: ".la.la-edit.la-3x.tableIconLink", altVal: " ", atag: "#/profile/modProfile/id/{id}", width: 30 }
    ],
    filtersPage: { searchCol: ["displayName", "streamKey"] }
  },

  rules: {
    cols: [
      { dKey: "ruleId", label: "Rule", sort: "asc", width: 120, tdStyle: "sectionLabel" },
      { dKey: "body", label: "Constitution text", minWidth: 360, tdStyle: "#modal_priors_cell.mClick.clickBg" },
      { dKey: "active", label: "On", width: 40 },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      { dKey: "", label: "", atagClasses: ".la.la-edit.la-3x.tableIconLink", altVal: " ", atag: "#/rules/modRules/id/{id}", width: 30 }
    ],
    filtersPage: { searchCol: ["ruleId", "body"] }
  },

  users: {
    cols: [
      { dKey: "displayName", label: "Preferred Name", sort: "asc", width: 150, tdStyle: "sectionLabel", altVal: "-Partial-" },
      { dKey: "loginName", label: "Session Name/Email", minWidth: 180, atag: "mailto:{email}"  },
      { dKey: "kind", label: "Kind", width: 80 },
      { dKey: "streamKey", label: "Own stream", minWidth: 140 },
      { dKey: "loginLevel", label: "Access Level", sort: "desc", hashMap: loginLevels },
      { dKey: "eStamp", label: "Updated", width: 60, dateFormat: "MM/DD/YY" },
      { dKey: "", label: "", atagClasses: ".la.la-edit.la-3x.tableIconLink", altVal: " ", atag: "#/users/modUser/id/{id}", width: 30 }
    ],
    filtersPage: { searchCol: ["displayName", "loginName", "streamKey"] },
    filtersExtra: {
      status: { dKey: "loginLevel", label: "Access Level", opts: loginLevels, numIndex: true, width: 100, getCount: true }
    }
  },

  activity: {},
  admin: {}
};

export {tableConfig};
