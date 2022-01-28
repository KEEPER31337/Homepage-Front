import React from 'react';

const headers = ['이름', '내용', '개근', '등수'];

const people = [
  {
    name: 'Googy',
    image:
      'https://goo-gy.github.io/static/bd980a9f8c3998db92fa9ed41520e21b/eaa90/nehalist-gatsby.png',
    content: '자동 출석입니다.',
    prize: '5일째 개근',
    rank: '1등',
  },
  {
    name: 'H',
    image:
      'https://goo-gy.github.io/static/bd980a9f8c3998db92fa9ed41520e21b/eaa90/nehalist-gatsby.png',
    content: '자동 출석입니다.',
    prize: '1일째 개근',
    rank: '2등',
  },
];

export default function AttandanceTable() {
  return (
    <div className="min-w-full flex flex-col">
      <div className="min-w-full overflow-x-auto">
        <div className="align-middle inline-block min-w-full sm:px-0 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg border-b border-gray-200 dark:border-darkPoint">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-gray-500 dark:bg-darkPoint dark:text-mainYellow">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white divide-gray-200 dark:bg-darkComponent dark:divide-darkPoint">
                {people.map((log, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={log.image}
                            alt="user-image"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-xl font-medium text-gray-900 dark:text-mainWhite">
                            {log.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="w-xl px-6 py-4 whitespace-nowrap">
                      <div className="text-md text-gray-900 dark:text-mainWhite">
                        {log.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {log.prize}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                      <span className="px-2 inline-flex text-xl leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {log.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xl font-medium">
                      <a
                        href="#"
                        className="text-mainYellow hover:text-pointYellow"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
