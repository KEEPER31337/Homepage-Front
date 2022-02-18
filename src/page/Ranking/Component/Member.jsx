const members = [
  {
    id: 1,
    generation: 7,
    nickName: 'Googy',
    thumbnail:
      'https://avatars.githubusercontent.com/u/23546441?s=400&u=db7abf2929e5518c12189034dc3fed9bda94f0a6&v=4',
  },
  {
    id: 2,
    generation: 8,
    nickName: 'Hyeonmo',
    thumbnail:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  },
  {
    id: 3,
    generation: 8,
    nickName: 'JaewookJaewook',
    thumbnail:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
  },
  {
    id: 4,
    generation: 8,
    nickName: 'Changyeol',
    thumbnail:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  },
  {
    id: 5,
    generation: 8,
    nickName: 'Seol',
    thumbnail:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  },
  {
    id: 6,
    generation: 8,
    nickName: 'Seol',
    thumbnail:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  },
  {
    id: 7,
    generation: 8,
    nickName: 'Seol',
    thumbnail:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  },
];

const Member = () => {
  return (
    <div className="bg-mainWhite dark:bg-mainBlack text-mainBlack dark:text-mainYellow">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">members</h2>

        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
          {members.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.thumbnail}
                  alt="profile"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm ">
                {`Keeper ${product.generation}기`}
              </h3>
              <p className="mt-1 text-lg font-medium">{product.nickName}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Member;
