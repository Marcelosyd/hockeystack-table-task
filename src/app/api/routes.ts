import { NextResponse } from 'next/server'
import pages from './pages.json'

export async function GET() {
  return NextResponse.json(pages)
}
