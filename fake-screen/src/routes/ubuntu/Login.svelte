<script>
    import Popup from "./Popup.svelte";
    import user from "./user.svg";
    import settings from "./settings.svg";
    import ubuntu from "./ubuntu.svg";

    let {
        onPasswordChange,
        password,
        hint,
        onSubmit,
        onPasswordClear,
        options,
        openPopup,
        closePopup,
        showPopup = $bindable(),
        onOptionClick,
    } = $props();

    function submit(e) {
        if (e.key !== "Enter") return;
        onSubmit();
    }
</script>

<div class="login">
    <footer>
        <div class="text">ubuntu</div>
        <div class="img">
            <img src={ubuntu} alt="ubuntu" />
        </div>
    </footer>
    <section class="content">
        <div class="user-detail">
            <img class="avatar" src={user} alt="avatar" />
            <div class="name">User</div>
        </div>
        <div class="input-container">
            <div class="label" for="password">Password:</div>
            <input
                id="password"
                type="password"
                name="password"
                value={password}
                onchange={onPasswordChange}
                onkeydown={submit}
            />
        </div>
        <div class="buttons">
            <div class="cancel">
                <button
                    class="form-button"
                    id="cancel"
                    onclick={onPasswordClear}
                >
                    Cancel
                </button>
            </div>
            <div class="settings">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="settings-icon" onclick={openPopup}>
                    <img src={settings} alt="settings" />
                </div>
                <Popup
                    {options}
                    bind:show={showPopup}
                    {onOptionClick}
                    onClose={closePopup}
                />
            </div>
            <button class="form-button" id="sign-in" onclick={onSubmit}>
                Sign In
            </button>
        </div>
        <div class="hint">{hint}</div>
    </section>
</div>

<style>
    .login {
        width: 100%;
        height: 100%;
        background-color: #2b0720;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        position: relative;
        .content {
            position: relative;
            width: 340px;
            display: flex;
            flex-direction: column;
            color: #fff;
            margin-bottom: 20px;
        }
        .user-detail {
            display: flex;
            align-items: center;
        }
        .avatar {
            width: 63px;
            height: 63px;
            border: 2px rgba(255, 255, 255, 0.8) solid;
            padding: 5px;
            border-radius: 3px;
        }
        .name {
            margin-left: 16px;
            color: rgba(255, 255, 255, 0.9);
        }
        .input-container {
            margin-top: 25px;
        }
        .label {
            font-weight: 300;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 0.6px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        }
        input {
            margin-top: 10px;
            border: none;
            background: rgb(40, 40, 40);
            box-shadow: inset 0px 1px 7px rgb(15, 15, 15);
            border-radius: 3px;
            height: 26px;
            width: 100%;
            color: rgba(255, 255, 255, 0.75);
            letter-spacing: 0.7px;
            padding: 8px;
        }
        .buttons {
            margin-top: 30px;
            width: 100%;
            display: flex;
            height: 26px;
        }
        .form-button {
            border: 1px black solid;
            border-radius: 3px;
            font-weight: 300;
            line-height: 100%;
            color: rgba(255, 255, 255, 0.75);
            text-shadow: 1px 1px 1px rgb(20, 20, 20, 1);
            width: 80px;
            height: 100%;
            font-size: 0.9em;
            text-align: center;
            background-color: rgb(50, 50, 50);
        }
        .settings {
            flex-grow: 1;
            position: relative;
            height: 100%;
        }
        .settings-icon {
            position: absolute;
            right: 8px;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            filter: drop-shadow(0 0 0.5px black);
            img {
                width: 15px;
                height: 15px;
            }
        }
        .hint {
            position: absolute;
            bottom: -60px;
            color: red;
            opacity: 0.7;
        }
        footer {
            position: absolute;
            bottom: 5%;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            .text {
                color: rgba(255, 255, 255, 0.8);
                font-weight: 300;
                font-size: 2.5em;
                text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
            }
            .img {
                margin-top: 10px;
                margin-left: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
                background: rgba(255, 255, 255, 0.8);
                img {
                    transform: translate(-1px, -1px);
                    opacity: 0.6;
                    width: 10px;
                    height: 10px;
                }
            }
        }
    }
</style>
