export function aboutURL(base: URL | string): URL {
    return new URL("/about", base);
}

export function historyURL(base: URL | string): URL {
    return new URL("/history", base);
}

export function viewURL(base: URL | string, name: string): URL {
    var u = new URL("/view", base);
    u.searchParams.set('name', name)

    return u;
}

export function tagURL(base: URL | string, options?: {
    page?: number;
    favorite_only?: boolean;
    search?: string;
    order?: 'ascending' | 'descending';
    sort?: 'name' | 'itemCount';
}): URL {
    const output = new URL("/tag", base);
    if (options != null) {
        const { page, favorite_only, search, order, sort } = options;

        if (page != null) {
            output.searchParams.set('page', `${page}`);
        }

        if (favorite_only != null) {
            output.searchParams.set('favorite_only', `${favorite_only}`);
        }

        if (search != null) {
            output.searchParams.set('search', search);
        }

        if (order != null) {
            output.searchParams.set('order', `${order}`);
        }

        if (sort != null) {
            output.searchParams.set('sort', `${sort}`);
        }

    }
    return output;
}

export function browseURL(base: URL | string, options?: {
    filter?: '' | 'favorite' | 'tag';
    item_per_page?: number;
    order?: 'ascending' | 'descending';
    page?: number;
    search?: string;
    sort?: 'name' | 'createTime' | 'pageCount';
    tag?: string;
}): URL {
    const output = new URL("/browse", base);

    if (options != null) {
        const { filter, item_per_page, order, page, search, sort, tag } = options;
        if (filter != null) {
            output.searchParams.set('filter', `${filter}`);
        }
        if (item_per_page != null) {
            output.searchParams.set('item_per_page', `${item_per_page}`);
        }
        if (order != null) {
            output.searchParams.set('order', `${order}`);
        }
        if (page != null) {
            output.searchParams.set('page', `${page}`);
        }

        if (search != null) {
            output.searchParams.set('search', `${search}`);
        }

        if (sort != null) {
            output.searchParams.set('sort', `${sort}`);
        }

        if (tag != null) {
            output.searchParams.set('tag', `${tag}`);
        }
    }

    return output;
}