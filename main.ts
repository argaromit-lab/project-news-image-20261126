// SPDX-License-Identifier: MIT
// The submitted image is frozen at the reviewed commit. No network or packages.
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const output = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(output, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), resolve(output, 'entry.png'));
