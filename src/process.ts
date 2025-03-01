import { Octokit, Config, File, Rule } from "./types.js";

import checkAssets from './rules/assets.js';
import checkAuthors from './rules/authors.js';
import checkNew from './rules/new.js';
import checkStatus from './rules/statuschange.js';
import checkStagnant from './rules/stagnant.js';
import checkTerminalStatus from './rules/terminal.js';
import checkEditorFile from './rules/editorFile.js';
import checkOtherFiles from './rules/unknown.js';

let rules = [ checkAssets, checkAuthors, checkNew, checkStatus, checkStagnant, checkTerminalStatus, checkEditorFile, checkOtherFiles ];

export default async function(octokit: Octokit, config: Config, files: File[]) {
    // Get results
    let res : Rule[][] = await Promise.all(rules.map(rule => rule(octokit, config, files)));

    // Merge results
    let ret: Rule[] = [];
    res.forEach(val => ret.push(...val));
    return ret;
}
