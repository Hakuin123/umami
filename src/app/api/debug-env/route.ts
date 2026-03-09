import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const cwd = process.cwd()

  const pathsToCheck = [
    path.resolve(cwd, 'certs/prod-ca-2021.crt'),
    `/vercel/path0/certs/prod-ca-2021.crt`,
    `/var/task/certs/prod-ca-2021.crt`,
    `/vercel/output/static/certs/prod-ca-2021.crt`,
  ]

  return NextResponse.json({
    cwd,
    NODE_EXTRA_CA_CERTS: process.env.NODE_EXTRA_CA_CERTS,
    pathChecks: pathsToCheck.map((p) => ({
      path: p,
      exists: fs.existsSync(p),
    })),
  })
}
