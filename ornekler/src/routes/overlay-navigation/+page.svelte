<!--
https://codepen.io/fluxus/pen/gPWxXJ
-->
<script>
    let isVisible = $state(false);
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
</svelte:head>

<div
    class="overlay-navigation"
    class:overlay-active={isVisible}
    class:overlay-slide-up={!isVisible}
    class:overlay-slide-down={isVisible}
>
    <nav>
        <ul>
            <li
                class:slide-in-nav-item-reverse={!isVisible}
                class:slide-in-nav-item={isVisible}
            >
                <a href="/#" data-content="The beginning">Home</a>
            </li>
            <li
                class:slide-in-nav-item-delay-1-reverse={!isVisible}
                class:slide-in-nav-item-delay-1={isVisible}
            >
                <a href="/#" data-content="Curious?">About</a>
            </li>
            <li
                class:slide-in-nav-item-delay-2-reverse={!isVisible}
                class:slide-in-nav-item-delay-2={isVisible}
            >
                <a href="/#" data-content="I got game">Skills</a>
            </li>
            <li
                class:slide-in-nav-item-delay-3-reverse={!isVisible}
                class:slide-in-nav-item-delay-3={isVisible}
            >
                <a href="/#" data-content="Only the finest">Works</a>
            </li>
            <li
                class:slide-in-nav-item-delay-4-reverse={!isVisible}
                class:slide-in-nav-item-delay-4={isVisible}
            >
                <a href="/#" data-content="Don't hesitate">Contact</a>
            </li>
        </ul>
    </nav>
</div>

<section class="home">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="open-overlay" onclick={() => (isVisible = !isVisible) }>
        <span
            class="bar-top"
            class:animate-out-top-bar={!isVisible}
            class:animate-top-bar={isVisible}
        ></span>
        <span
            class="bar-middle"
            class:animate-out-middle-bar={!isVisible}
            class:animate-middle-bar={isVisible}
        ></span>
        <span
            class="bar-bottom"
            class:animate-out-bottom-bar={!isVisible}
            class:animate-bottom-bar={isVisible}
        ></span>
    </div>
</section>

<style>
    @import url(https://fonts.googleapis.com/css?family=Work+Sans:400,300,700|Open+Sans:400italic,300italic);
    :global(body) {
        background-color: #fff;
    }

    .home {
        width: 100%;
        height: 100vh;
        position: relative;
        background-image: url(photo.jpg);
        background-size: cover;
        background-position: center center;
    }

    /* Navigation */

    .overlay-navigation {
        position: fixed;
        z-index: 99;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: hsla(0, 0%, 0%, 0.8);
        transform: translateY(-100%);
    }

    .overlay-slide-down {
        transition: all 0.4s ease-in-out;
        transform: translateY(0);
    }

    .overlay-slide-up {
        transition: all 0.8s ease-in-out;
        transform: translateY(-100%);
    }

    nav,
    nav ul {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    nav ul {
        display: flex;
        list-style: none;
    }

    nav ul li {
        flex-basis: 20%;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
        transform: translateY(-100%);
    }

    nav li a {
        position: relative;
        top: 46%;
        color: #fff;
        text-transform: uppercase;
        font-family: "Work sans", sans-serif;
        font-weight: 300;
        letter-spacing: 4px;
        text-decoration: none;
        display: block;
        text-align: center;
        font-size: 0.9rem;
    }

    nav li a:before {
        content: "";
        width: 70px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 0;
        z-index: 100;
        transform: translateX(-100%);
        opacity: 0;
        transition: all 0.2s linear;
    }

    nav li a:after {
        content: attr(data-content);
        font-size: 0.7rem;
        transition: all 0.2s linear;
        opacity: 0;
        position: absolute;
        z-index: 100;
        color: #fff;
        display: block;
        margin-right: auto;
        margin-left: auto;
        left: 0;
        right: 0;
        bottom: -50px;
        text-transform: none;
        font-family: "Open sans", serif;
        font-weight: 300;
        font-style: italic;
        letter-spacing: 0;
    }

    nav li a:hover:before {
        transform: translateX(0);
        opacity: 1;
    }

    nav li a:hover:after {
        transform: translateY(15px);
        opacity: 1;
    }

    nav li:nth-of-type(1) {
        background-color: #29363b;
    }
    nav li:nth-of-type(2) {
        background-color: #ea495f;
    }
    nav li:nth-of-type(3) {
        background-color: #f4837d;
    }
    nav li:nth-of-type(4) {
        background-color: #fdcea9;
    }
    nav li:nth-of-type(5) {
        background-color: #99b998;
    }

    .slide-in-nav-item {
        animation: slide-in-nav-item 0.4s linear 1 0.2s both;
    }

    .slide-in-nav-item-delay-1 {
        animation: slide-in-nav-item 0.4s linear 1 0.4s both;
    }

    .slide-in-nav-item-delay-2 {
        animation: slide-in-nav-item 0.4s linear 1 0.6s both;
    }

    .slide-in-nav-item-delay-3 {
        animation: slide-in-nav-item 0.4s linear 1 0.8s both;
    }

    .slide-in-nav-item-delay-4 {
        animation: slide-in-nav-item 0.4s linear 1 1s both;
    }

    .slide-in-nav-item-reverse {
        animation: slide-in-nav-item-reverse 0.3s linear 1 0.5s both;
    }

    .slide-in-nav-item-delay-1-reverse {
        animation: slide-in-nav-item-reverse 0.3s linear 1 0.4s both;
    }

    .slide-in-nav-item-delay-2-reverse {
        animation: slide-in-nav-item-reverse 0.3s linear 1 0.3s both;
    }

    .slide-in-nav-item-delay-3-reverse {
        animation: slide-in-nav-item-reverse 0.3s linear 1 0.2s both;
    }

    .slide-in-nav-item-delay-4-reverse {
        animation: slide-in-nav-item-reverse 0.3s linear 1 both;
    }

    /* Burger menu */

    .open-overlay {
        position: absolute;
        right: 5rem;
        top: 3.2rem;
        z-index: 100;
        width: 34px;
        display: block;
        cursor: pointer;
    }

    .open-overlay span {
        display: block;
        height: 1px;
        background-color: #fff;
        cursor: pointer;
        margin-top: 8px;
    }

    .animate-top-bar {
        animation: animate-top-bar 0.6s linear 1 both;
    }

    .animate-bottom-bar {
        animation: animate-bottom-bar 0.6s linear 1 both;
    }

    .animate-middle-bar {
        animation: animate-middle-bar 0.6s linear 1 both;
    }

    .animate-out-top-bar {
        animation: animate-out-top-bar 0.6s linear 1 both;
    }

    .animate-out-bottom-bar {
        animation: animate-out-bottom-bar 0.6s linear 1 both;
    }

    .animate-out-middle-bar {
        animation: animate-out-middle-bar 0.6s linear 1 both;
    }

    /* Animation keyframes */
    @keyframes slide-in-nav-item {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-in-nav-item-reverse {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-100%);
        }
    }

    @keyframes animate-top-bar {
        0% {
            background-color: #fff;
        }
        50% {
            transform: translateY(9px);
        }
        80% {
            transform: translateY(5px);
            background-color: #fff;
        }
        100% {
            transform: translateY(0);
            background-color: #29363b;
        }
    }

    @keyframes animate-bottom-bar {
        0% {
            background-color: #fff;
        }
        50% {
            transform: translateY(-9px);
        }
        80% {
            transform: translateY(-5px);
            background-color: #fff;
        }
        100% {
            transform: translateY(0);
            background-color: #29363b;
        }
    }

    @keyframes animate-middle-bar {
        0% {
            background-color: #fff;
        }
        80% {
            background-color: #fff;
        }
        100% {
            background-color: #29363b;
        }
    }

    @keyframes animate-out-top-bar {
        0% {
            background-color: #29363b;
        }
        50% {
            transform: translateY(9px);
        }
        80% {
            transform: translateY(5px);
            background-color: #29363b;
        }
        100% {
            transform: translateY(0);
            background-color: #fff;
        }
    }

    @keyframes animate-out-bottom-bar {
        0% {
            background-color: #29363b;
        }
        50% {
            transform: translateY(-9px);
        }
        80% {
            transform: translateY(-5px);
            background-color: #29363b;
        }
        100% {
            transform: translateY(0);
            background-color: #fff;
        }
    }

    @keyframes animate-out-middle-bar {
        0% {
            background-color: #29363b;
        }
        80% {
            background-color: #29363b;
        }
        100% {
            background-color: #fff;
        }
    }

    @media (max-width: 640px) {
        nav ul li a {
            font-size: 11px;
        }
        nav li a:after {
            font-size: 0.6rem;
        }
        .open-overlay {
            right: 1rem;
        }
        nav li a:before {
            width: 15px;
        }
    }
</style>
