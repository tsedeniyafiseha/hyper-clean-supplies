import { GET } from '@/app/api/categories/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
    },
  },
}));

describe('GET /api/categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all categories', async () => {
    const mockCategories = [
      { id: 1, name: 'Cleaning Chemicals', slug: 'cleaning-chemicals', _count: { products: 5 } },
      { id: 2, name: 'Bathroom Care', slug: 'bathroom-care', _count: { products: 3 } },
    ];

    (prisma.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockCategories);
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  });

  it('handles database errors', async () => {
    (prisma.category.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch categories');
  });
});
