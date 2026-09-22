/**
 * Single import for site copy: parses `resume.json` and asserts the `Resume` type.
 * JSON cannot express string-union literals (`icon`, `accent`), so the assertion
 * is the contract `tsc` + `check-content` enforce at build.
 */
import type { Resume } from './types'
import data from './resume.json'

export const resume: Resume = data as Resume
