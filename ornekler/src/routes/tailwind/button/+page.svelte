<a href="/tailwind/button" class="bg-green-500 btnx">Green</a>
<a href="/tailwind/button" class="bg-blue-600 btnx">Blue</a>
<a href="/tailwind/button" class="bg-red-400 btnx">Red</a>
<a href="/tailwind/button" class="bg-yellow-400 btnx">Yellow</a>
<a href="/tailwind/button" class="bg-gray-400 btnx">Gray</a>
<a href="/tailwind/button" class="bg-zinc-500 btnx">Zinc</a>
<a href="/tailwind/button" class="bg-slate-500 btnx">Slate</a>
<a href="/tailwind/button" class="bg-neutral-500 btnx">Neutral</a>
<a href="/tailwind/button" class="bg-teal-400 btnx hover:bg-indigo-400">Teal</a>

<div class="bg-green-300 border-green-600 border-b p-4 m-4 rounded w-32 h-14 cursor-pointer">
    Hello World
  </div>

<!-- en mantıklısı bu -->
  <button class="bg-indigo-600 hover:bg-indigo-500 px-4 py-3 rounded-lg">
    Button
  </button>

<!-- tıklama effecti var  active:scale-95 ile veriliyor  -->
  <button class="bg-indigo-600 px-4 py-3 text-center text-sm font-semibold inline-block text-white cursor-pointer transition duration-200 ease-in-out rounded-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95">
    Tailwind Button
  </button>


  <div class="bg-green-300 border-green-600 border-b p-4 m-4 rounded">
    Hello World
  </div>

  <div class="bg-gray-500 hover:bg-red-600 size-16">Hover</div>

<!-- https://www.geeksforgeeks.org/tailwind-css/ -->
  <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
    <div class="p-6 hover:bg-green-600 hover:text-white transition duration-300 ease-in">
      <h1 class="text-2xl font-semibold mb-3">Hover</h1>
    </div>
  </div>

  <div class="text-center">
    <h1 class="text-green-600 text-5xl font-bold">Başlık</h1>
    <b>Tailwind CSS Z-Index</b>
    <div class="flex-col">
      <div class="relative z-0 w-full h-12 bg-green-400">0</div>
      <div class="relative z-10 w-full h-12 bg-yellow-400">1</div>
      <div class="relative z-20 w-full h-12 bg-red-400">2</div>
      <div class="relative z-30 w-full h-12 bg-blue-400">3</div>
      <div class="relative z-40 w-full h-12 bg-green-300">4</div>
      <div class="relative z-50 w-full h-12 bg-orange-400" style="top:32px;">5</div>
    </div>
  </div>
