import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, shopeeUrl: true },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    await prisma.clickLog.create({
      data: { productId: product.id },
    })

    return NextResponse.json({ shopeeUrl: product.shopeeUrl })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    )
  }
}
