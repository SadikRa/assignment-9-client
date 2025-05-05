export interface IProduct {
  product: {
    id: "prod-1";
    name: "Wireless Headphones";
    price: 199.99;
    description: "High-quality noise-cancelling headphones";
    imageUrl: "/images/headphones.jpg";
    isDeleted: false;
    createdAt: "2025-05-01T11:00:00Z";
    updatedAt: "2025-05-01T11:00:00Z";
    companyId: null;
  };
  category: {
    id: "cat-1";
    categoryImage: "/images/electronics.jpg";
    name: "Electronics";
  };
  review: {
    id: "rev-1";
    title: "Excellent Sound Quality";
    description: "Best headphones I’ve ever used.";
    rating: 5;
    categoryId: "cat-1";
    productId: "prod-1";
    purchaseSource: "Amazon";
    images: ["/reviews/rev1-img1.jpg"];
    isPremium: false;
    accountId: "acc-1";
    status: "APPROVED";
    moderationNote: null;
    createdAt: "2025-05-02T09:00:00Z";
    updatedAt: "2025-05-02T09:00:00Z";
    isDeleted: false;
  };
  votes: [
    {
      id: "vote-1";
      reviewId: "rev-1";
      accountId: "acc-1";
      createdAt: "2025-05-02T10:00:00Z";
      updatedAt: "2025-05-02T10:00:00Z";
    }
  ];
  comments: [
    {
      id: "com-1";
      reviewId: "rev-1";
      accountId: "acc-1";
      content: "Totally agree with this review!";
      createdAt: "2025-05-02T10:30:00Z";
      updatedAt: "2025-05-02T10:30:00Z";
      isDeleted: false;
    }
  ];
}
