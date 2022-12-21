import React from "react";

const Home = () => {
  return (
    <div class="w-[450px] mx-auto mt-[3rem]">
    <form class="w-full">
      <div class="flex items-center justify-center border-b border-teal-500 py-2">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Feed the dog"
        />
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Add
        </button>
      </div>
    </form>
    <div class="flex justify-center">
  <ul class="bg-white rounded-lg border border-gray-200 w-[500px] mt-[3rem] text-gray-900">
    <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">An item</li>
    <li class="px-6 py-2 border-b border-gray-200 w-full">A second item</li>
    <li class="px-6 py-2 border-b border-gray-200 w-full">A third item</li>
    <li class="px-6 py-2 border-b border-gray-200 w-full">A fourth item</li>
    <li class="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
  </ul>
</div>
    </div>
  );
};

export default Home;
