import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AccountOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    redirect("/signin");
  }

  // Get user ID from database using email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    redirect("/signin");
  }

  const userId = user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-black/60">You don&apos;t have any orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-black/10 rounded-2xl p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <p className="text-sm text-black/60">
                    Order ID: <span className="text-black">#{order.id}</span>
                  </p>
                  <p className="text-sm text-black/60">
                    Placed on{" "}
                    {order.createdAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-sm font-medium">
                    Status:{" "}
                    <span className="uppercase">
                      {order.status}
                    </span>
                  </p>
                  <p className="text-lg md:text-xl font-bold">
                    ${Number(order.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>

              <hr className="border-t-black/10 mb-4" />

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm md:text-base"
                  >
                    <div>
                      <p className="font-medium text-black">{item.name}</p>
                      <p className="text-black/60">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${Number(item.unitPrice).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


