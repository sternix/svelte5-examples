<script>
  import { Brush, Circle, Eraser, Rectangle, Triangle } from "./assets";

  let clearCanvas = $state(false);
  let sliderValue = $state(5);
  let selectedColor = $state("#4A98F7");
  let toolsForDrawing = $state("brush");
  let isCheckedForFill = $state(false);
  let canvasBackgroundColor = $state("#f3f4f6");

  let canvas, context;

  let snapShot = $state(null);
  let isDrawing = $state(false);
  let passingCurrentMousePosition = $state({
    x: 0,
    y: 0,
  });

  $effect(() => {
    context = canvas.getContext("2d", { willReadFrequently: true });
    const set_canvas_bg_color = () => {
      canvasBackgroundColor
        ? (context.fillStyle = canvasBackgroundColor)
        : (context.fillStyle = "#FFFF");
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const resizing_canvas_width_height = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      set_canvas_bg_color();
    };

    typeof context.fillRect === "function" && resizing_canvas_width_height();

    window.addEventListener("load", resizing_canvas_width_height);

    return () =>
      document.removeEventListener("load", resizing_canvas_width_height);
  });

  function drawRectangle({ offsetX, offsetY }) {
    isCheckedForFill
      ? context.fillRect(
          offsetX,
          offsetY,
          passingCurrentMousePosition.x - offsetX,
          passingCurrentMousePosition.y - offsetY,
        )
      : context.strokeRect(
          offsetX,
          offsetY,
          passingCurrentMousePosition.x - offsetX,
          passingCurrentMousePosition.y - offsetY,
        );
  }

  function drawCircle({ offsetX, offsetY }) {
    // create new path to draw a new circle every time...
    context.beginPath();

    const radius = Math.sqrt(
      Math.pow(passingCurrentMousePosition.x - offsetX, 2) +
        Math.pow(passingCurrentMousePosition.y - offsetY, 2),
    );

    // this method is used to create a circle... // x , y , radius, start-angle, end-angle
    // creating circle according to the mouse pointer...
    context.arc(
      passingCurrentMousePosition.x,
      passingCurrentMousePosition.y,
      radius,
      0,
      2 * Math.PI,
    );
    isCheckedForFill ? context.fill() : context.stroke();
  }

  function drawTriangle({ offsetX, offsetY }) {
    // create new path to draw a new circle every time...
    context.beginPath();

    // moving triangle to the mouse point
    context.moveTo(
      passingCurrentMousePosition.x,
      passingCurrentMousePosition.y,
    );

    // creating the 1st line according to the mouse point
    context.lineTo(offsetX, offsetY);

    // creating bottom line of triangle
    context.lineTo(passingCurrentMousePosition.x * 2 - offsetX, offsetY);

    // close path of a triangle, so that 3rd line draw automatically...
    context.closePath();

    isCheckedForFill ? context.fill() : context.stroke();
  }

  function startDrawing(e) {
    isDrawing = true;

    // store current mouse position...
    passingCurrentMousePosition = {
      x: e.offsetX,
      y: e.offsetY,
    };

    // this method, create a new path to draw point...
    context.beginPath();

    // drawing line width...
    context.lineWidth = sliderValue;

    // set line color
    context.strokeStyle = selectedColor; // set color for stroke
    context.fillStyle = selectedColor; // set color for fill

    // this method return an Image Data Object that copies the pixel data.
    // copy canvas data & passing as snapshot value... this avoid dragging the image...
    snapShot = context.getImageData(0, 0, canvas.width, canvas.height);
  }

  function drawingInCanvas(e) {
    if (isDrawing) {
      // this method, puts the image data back ont the canvas.
      // so adding coping canvas data on to this canvas.
      context.putImageData(snapShot, 0, 0);

      if (toolsForDrawing === "brush" || toolsForDrawing === "eraser") {
        // for erasing...
        context.strokeStyle =
          toolsForDrawing === "eraser" ? canvasBackgroundColor : selectedColor;

        // for brush + eraser <==== both need these 2 line of statement to execute()
        // lineTo() method create a new line
        // creating line according to the mouse point...
        context.lineTo(e.offsetX, e.offsetY);

        // drawing/fill line with color...
        context.stroke();
      } else if (toolsForDrawing === "rectangle") {
        drawRectangle(e);
      } else if (toolsForDrawing === "circle") {
        drawCircle(e);
      } else if (toolsForDrawing === "triangle") {
        drawTriangle(e);
      }
    }
  }

  const stopDrawing = () => (isDrawing = false);

  const handlerToolsForDrawing = (id) => (toolsForDrawing = id);

  const handleClearCanvas = () => {
    // reset canvas background...
    canvasBackgroundColor = "#f3f4f6";

    // clear whole canvas...
    clearCanvas = context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveDrawingAsImage = () => {
    // creating <a> element
    const image = document.createElement("a");

    // set current date as downloadable file name
    image.download = `${Date().slice(0, 24)}.jpg`;

    // passing canvas data as link href value
    image.href = canvas.toDataURL();

    // click link to download image
    image.click();
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
  class="bg-gray-100 rounded-md p-3 text-gray-700 select-none flex flex-col justify-between"
>
  <div class="space-y-4">
    <div>
      <label for="" class="title text-lg font-bold">Shapes</label>
      <ul class="pt-2">
        <li
          class={`toolsStyle group ${toolsForDrawing === "rectangle" && "text-orange-500"}`}
          onclick={() => handlerToolsForDrawing("rectangle")}
        >
          <Rectangle class="childToolStyle" />
          <label class="childToolStyle" for="rectangle">Rectangle</label>
        </li>

        <li
          class={`toolsStyle group ${toolsForDrawing === "circle" && "text-orange-500"}`}
          onclick={() => handlerToolsForDrawing("circle")}
        >
          <Circle class="childToolStyle" />
          <span class="childToolStyle">Circle</span>
        </li>

        <li
          class={`toolsStyle group ${toolsForDrawing === "triangle" && "text-orange-500"}`}
          onclick={() => handlerToolsForDrawing("triangle")}
        >
          <Triangle class="childToolStyle" />
          <span class="childToolStyle">Triangle</span>
        </li>

        <li class="toolsStyle group">
          <input
            type="checkbox"
            id="fillColor"
            class="w-4 h-4"
            onchange={(e) => (isCheckedForFill = e.currentTarget.checked)}
          />
          <label for="fillColor" class="cursor-pointer childToolStyle">
            Fill Color
          </label>
        </li>
      </ul>
    </div>

    <!-- Options -->
    <div>
      <label for="" class="title text-lg font-bold">Options</label>
      <ul class="options pt-2">
        <li
          class={`toolsStyle group ${toolsForDrawing === "brush" && "text-orange-500"}`}
          onclick={() => handlerToolsForDrawing("brush")}
        >
          <Brush class="childToolStyle" />
          <span class="childToolStyle">Brush</span>
        </li>

        <li
          class={`toolsStyle group ${toolsForDrawing === "eraser" && "text-orange-500"}`}
          onclick={() => handlerToolsForDrawing("eraser")}
        >
          <Eraser class="childToolStyle" />
          <span class="childToolStyle">Eraser</span>
        </li>

        <li class="option">
          <input
            type="range"
            min="1"
            value="5"
            max="30"
            class="w-full h-1.5"
            onchange={(e) => (sliderValue = +e.currentTarget.value)}
          />
        </li>
      </ul>
    </div>

    <!-- Colors -->
    <div>
      <span class="font-semibold">Line Colors</span>

      <ul class="options flex gap-2 items-center justify-between px-2 py-2">
        <li
          class={`customColorList border ${selectedColor === "rgb(255, 255, 255)" && "before:border-gray-300 before:border-2  before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:absolute before:w-4 before:h-4 before:rounded-full"}`}
          style="background-color: #fff"
          onclick={(e) =>
            (selectedColor = e.currentTarget.style.backgroundColor)}
        ></li>

        <li
          class={`customColorList ${selectedColor === "rgb(17, 17, 17)" && "before:border-white before:border-2 before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:absolute before:w-4 before:h-4 before:rounded-full"}`}
          style="background-color: #111"
          onclick={(e) =>
            (selectedColor = e.currentTarget.style.backgroundColor)}
        ></li>

        <li
          class={`customColorList ${selectedColor === "rgb(239, 68, 68)" && "before:border-white before:border-2 before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:absolute before:w-4 before:h-4 before:rounded-full"}`}
          style="background-color: #ef4444"
          onclick={(e) =>
            (selectedColor = e.currentTarget.style.backgroundColor)}
        ></li>

        <li
          class={`customColorList ${selectedColor === "rgb(251, 146, 60)" && "before:border-white before:border-2 before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:absolute before:w-4 before:h-4 before:rounded-full"}`}
          style="background-color:#fb923c"
          onclick={(e) =>
            (selectedColor = e.currentTarget.style.backgroundColor)}
        ></li>

        <li
          class={`customColorList ${selectedColor === "rgb(34, 197, 94)" && "before:border-white before:border-2 before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:absolute before:w-4 before:h-4 before:rounded-full"}`}
          style="background-color:#22c55e"
          onclick={(e) =>
            (selectedColor = e.currentTarget.style.backgroundColor)}
        ></li>

        <input
          type="color"
          value={selectedColor}
          class={`colorSelector ${selectedColor === "#4A98F7" && "before:border-white before:border-2 before:top-1/2 before:left-1/2 before:translate-x-[-50%] before:translate-y-[-50%] before:absolute before:w-4 before:h-4 before:rounded-full"}`}
          onchange={(e) => (selectedColor = e.currentTarget.value)}
        />
      </ul>
    </div>

    <!-- Canvas Color -->
    <div>
      <p class="font-semibold">Canvas Color</p>
      <input
        type="color"
        value={canvasBackgroundColor}
        class="w-full h-10 rounded-md border-0"
        onchange={(e) => (canvasBackgroundColor = e.currentTarget.value)}
      />
    </div>
  </div>

  <div class="space-y-2 text-gray-700">
    <button
      class="btn border border-gray-500 hover:bg-red-500 hover:border-white"
      onclick={handleClearCanvas}
    >
      Clear Canvas
    </button>

    <button
      class="btn text-white bg-customBg hover:bg-green-500"
      onclick={handleSaveDrawingAsImage}
    >
      Save as image
    </button>
  </div>
</section>

<section class="flex-1 rounded-md">
  <!-- svelte-ignore element_invalid_self_closing_tag -->
  <canvas
    bind:this={canvas}
    style="background-color: {canvasBackgroundColor}"
    class="w-full h-full rounded-md"
    onmousedown={startDrawing}
    onmousemove={drawingInCanvas}
    onmouseup={stopDrawing}
  />
</section>
