<script>
    import find from "./find.svg";
    import smile from "./smile.svg";

    let { goMain, onSearch, query } = $props();

    let value = $state(query);
    let tag = $state("All");

    function onClick() {
        onSearch(value);
    }

    function onKeyDown(e) {
        if (e.key !== "Enter") return;
        onSearch(value);
    }
</script>

<div class="google-search">
    <section class="top-bars">
        <div class="top-bar">
            <div class="bar-items left">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <img
                    data-testid="logo"
                    onclick={goMain}
                    class="logo"
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    alt="Google"
                />
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div class="search-bar">
                    <input
                        data-testid="input2"
                        id="search"
                        type="text"
                        name="search"
                        bind:value
                        onkeydown={onKeyDown}
                    />
                    <div class="icon">
                        <img
                            src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"
                            alt="microphone"
                        />
                    </div>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="icon" onclick={onClick} data-testid="search">
                        <img src={find} alt="find" />
                    </div>
                </div>
            </div>
            <div class="bar-items right">
                <div class="functions">
                    <img src={smile} alt="smile" />
                </div>
            </div>
        </div>
        <div class="app-bar">
            <div class="tags left">{renderTags()}</div>
            <div class="tags right">
                <div class="tag">Settings</div>
                <div class="tag">Tools</div>
            </div>
        </div>
    </section>
    <section class="content">
        <p>
            Your search -{" "}
            <span data-testid="content" id="search-in-content">
                {query}
            </span>{" "}
            - did not match any documents.
        </p>
        <p>Suggestions</p>
        <ul>
            <li>Make sure that all words are spelled correctly.</li>
            <li>Try different keywords.</li>
            <li>Try more general keywords.</li>
        </ul>
    </section>
    <footer>
        <section class="upper">
            <div class="footer-items left">
                <div class="item">Taiwan</div>
            </div>
        </section>
        <section class="lower">
            <div class="footer-items left">
                <div class="item">Help</div>
                <div class="item">Send feedback</div>
                <div class="item">Privacy</div>
                <div class="item">Terms</div>
            </div>
        </section>
    </footer>
</div>

<style>
    .google-search {
        height: 100%;
        background: white;
        padding-top: 22px;
        position: relative;
        .top-bars {
            border-bottom: 1px rgb(235, 235, 235) solid;
        }
        .top-bar {
            height: 44px;
        }
        .app-bar {
            height: 58px;
            margin-left: 154px;
            position: relative;
            width: 584px;
        }
        .bar-items {
            display: flex;
            align-items: center;
            position: relative;
            height: 44px;
        }
        .left {
            position: absolute;
            left: 0;
        }
        .right {
            position: absolute;
            right: 4px;
        }
        .logo {
            width: 150px;
            height: 34px;
            padding: 4px 28px 0 30px;
            cursor: pointer;
        }
        .search-bar {
            display: flex;
            align-items: center;
            border-radius: 22px;
            width: 586px;
            height: 46px;
            border: 1px rgb(223, 225, 229) solid;
            padding: 5px 0 0 20px;
            input {
                outline: 0;
                border: 0;
                flex: 1;
                width: 30px;
                font-size: 16px;
            }
            img {
                width: 24px;
                height: 24px;
            }
            .icon {
                width: 40px;
            }
            .icon:nth-of-type(1) {
                cursor: pointer;
            }
            .icon:nth-of-type(2) {
                fill: rgb(66, 133, 244);
                color: rgb(66, 133, 244);
            }
        }
        .functions {
            display: flex;
            align-items: center;
            height: 100%;
            padding-right: 14px;
            img {
                margin: 8px;
                width: 24px;
                cursor: pointer;
                height: 24px;
            }
        }
        .tags {
            height: 100%;
            display: flex;
            font-size: 13px;
            align-items: center;
            color: rgb(119, 119, 119);
        }
        .tag.active {
            color: rgb(26, 115, 232);
            border-bottom: 3px rgb(26, 115, 232) solid;
            font-weight: 700;
        }
        .tag {
            height: 100%;
            cursor: pointer;
            padding: 28px 16px 0;
            &:hover:not(.active) {
                color: rgb(34, 34, 34);
            }
        }

        .content {
            color: rgb(34, 34, 34);
            padding: 55px 0 0 170px;
            p {
                margin: 16px 0;
            }
        }
        #search-in-content {
            font-weight: 700;
        }
        footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 83px;
            border-top: 1px solid rgba(0, 0, 0, 0.07);
            background-color: rgba(0, 0, 0, 0.05);
            .upper {
                position: relative;
                color: rgba(0, 0, 0, 0.54);
                width: 100%;
                font-size: 15px;
                padding-bottom: 2px;
                height: 50%;
            }
            .lower {
                position: relative;
                border-top: 1px solid rgba(0, 0, 0, 0.07);
                height: 50%;
                color: rgb(95, 99, 104);
                font-size: 13px;
                width: 100%;
                .item {
                    cursor: pointer;
                }
                .item:hover {
                    text-decoration: underline;
                }
            }
            .footer-items {
                height: 100%;
                display: flex;
                align-items: center;
                padding-left: 150px;
                position: relative;
            }
            .left .item {
                margin-right: 27px;
            }
        }
        @media (max-width: 800px) {
            .top-bar {
                height: auto;
            }
            .bar-items.left {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                height: auto;
                position: relative;
            }
            .bar-items.right {
                display: none;
            }
            .search-bar {
                margin-top: 15px;
                width: 90%;
                height: 40px;
                border-radius: 3px;
                padding: 0px 5px 0 10px;
                .icon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                }
            }
            .app-bar {
                margin: 0 15px;
                width: calc(100% - 30px);
                height: 40px;
            }
            .tags {
                display: flex;
                width: 100%;
            }
            .tags.right {
                display: none;
            }
            .tag {
                text-align: center;
                padding: 16px 0 0 0;
                flex: 1;
            }
            .content {
                padding: 10px 40px;
            }
            .footer-items.left {
                padding-left: 25px;
            }
            footer .left .item {
                margin-right: 15px;
            }
        }
    }
</style>
