export function aboutURL(base: URL | string): URL {
    return new URL("/about", base);
}

export function historyURL(base: URL | string): URL {
    return new URL("/history", base);
}

export function tagURL(base: URL | string, options?: { page?: number, favorite_only?: boolean, search?: string }): URL {
    const output = new URL("/tags", base);
    if (options != null) {
        const { page, favorite_only, search } = options;

        if (page != null) {
            output.searchParams.set('page', `${page}`);
        }

        if (favorite_only != null) {
            output.searchParams.set('favorite_only', `${favorite_only}`);
        }

        if (search != null) {
            output.searchParams.set('search', search);
        }
    }
    return output;
}

export function browseURL(base: URL | string, options?: {
    favorite_only?: boolean;
    item_per_page?: number;
    order?: 'ascending' | 'descending';
    page?: number;
    search?: string;
    sort?: 'name' | 'createTime' | 'pageCount';
    tag?: string;
}): URL {
    const output = new URL("/browse", base);
    
    if (options != null) {
        const { favorite_only, item_per_page, order, page, search, sort, tag } = options;
        if (favorite_only != null) {
            output.searchParams.set('favorite_only', `${favorite_only}`);
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