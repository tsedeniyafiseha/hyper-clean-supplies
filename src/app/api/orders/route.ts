import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { validatePagination, createPaginationMeta } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    
    // Validate pagination parameters
    const { page, limit, skip } = validatePagination(searchParams);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: Number(session.user.id) },
        include: {
          items: {
            select: {
              id: true,
              name: true,
              quantity: true,
              unitPrice: true,
              imageUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.order.count({ where: { userId: Number(session.user.id) } }),
    ]);

    return NextResponse.json({
      orders,
      pagination: createPaginationMeta(page, limit, total),
    });
  } catch (error) {
    logger.error("Failed to fetch user orders", error as Error, { endpoint: "GET /api/orders" });
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
