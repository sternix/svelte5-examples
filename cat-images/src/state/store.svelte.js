class ImageStore {
    #imgs = $state([]);

    get images() {
        return this.#imgs;
    }

    set images(_imgs) {
        this.#imgs = _imgs;
    }

    get count() {
        return this.#imgs.length;
    }
}

export const store = new ImageStore();