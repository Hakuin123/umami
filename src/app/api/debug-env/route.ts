import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function listDir(dir: string, depth = 0): string[] {
  if (depth > 3) return []
  try {
    return fs.readdirSync(dir).flatMap((f) => {
      const full = path.join(dir, f)
      try {
        const stat = fs.statSync(full)
        if (stat.isDirectory()) return [full + '/', ...listDir(full, depth + 1)]
        return [full]
      } catch {
        return [full + ' (err)']
      }
    })
  } catch {
    return [`${dir} (unreadable)`]
  }
}

export async function GET() {
  const cwd = process.cwd()
  return NextResponse.json({
    cwd,
    NODE_EXTRA_CA_CERTS: process.env.NODE_EXTRA_CA_CERTS,
    cwdTree: listDir(cwd),
    vercelPath0: listDir('/vercel/path0'),
    varTask: listDir('/var/task'),
  })
}
