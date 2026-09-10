'use strict';

// grokmem vocabulary. EventStore host helper is unchanged.

const ttLocs = { local: "Local / Device", cloud: "Hosted API", virtual: "Virtual" }

const lobs = ["Personal", "Team", "Agent", "Shared"]

const chatStatus = {
  draft: "Draft (not in index)",
  indexed: "Indexed",
  sealed: "Sealed"
}

const projectStatus = {
  active: "Active",
  parked: "Parked",
  archived: "Archived"
}

const factStatus = {
  current: "HEAD / current",
  superseded: "Superseded",
  tombstone: "Forgotten"
}

const includeTriggers = {
  explicit: "User said include / flush",
  periodic: "Periodic durable flush",
  session_end: "Session end"
}

const patchTypes = {
  episode: "Episode summary",
  decision: "Decision",
  correction: "Correction",
  preference: "Preference / constraint",
  open_loop: "Open loop",
  close_loop: "Closed loop",
  fact: "Fact"
}

const streamKinds = {
  index: "Index (always-on catalog)",
  chat: "Chat episode stream",
  user: "User profile HEAD",
  project: "Project / entity HEAD",
  rules: "Memory constitution",
  agent: "Agent working notes"
}

const loginLevels = ["Access Pending", "Visitor", "Member", "Editor", "Admin", "System Admin"]
const commitmentTypes = { observe: "Observe only", write: "May append", gate: "May gate into HEAD" }
const soundPrefs = { debug: "Debug beep on all views", normal: "Occasional Highlights", none: "None" }
const skillCats = { memory: "Memory", recall: "Recall", project: "Project" }

// aliases so leftover TeamAssist imports do not explode
const teamStatus = chatStatus
const statusColors = { draft: "#89a0c3", indexed: "#57a1e4", sealed: "#f57c00",
  active: "#4bb529", parked: "#57a1e4", archived: "#333" }

const ENTER_KEY = 13;
const ESC_KEY = 27;

function getEventStoreUrl (stream) {
  const protocol = window.location.href.split(":")[0];
  const debug = window.location.href.match(/debug/);
  const host = window.location.href.match(/localhost/) ? "localhost" : location.host
  let url = `${protocol}://${host}:2113`;

  if (debug) {
    url = "http://localhost:2113";
  }

  if (stream) {
    url = `${url}/streams/${stream}`
  }

  return url;
}

export {
  ttLocs, lobs, teamStatus, statusColors, chatStatus, projectStatus, factStatus,
  includeTriggers, patchTypes, streamKinds, skillCats, loginLevels,
  commitmentTypes, soundPrefs, ENTER_KEY, ESC_KEY, getEventStoreUrl
};
