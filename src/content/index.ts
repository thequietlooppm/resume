/**
 * Single import for site copy: parses `resume.json` and asserts the `Resume` type.
 */
import type { Resume } from './types'
import data from './resume.json'

export const resume: Resume = data
