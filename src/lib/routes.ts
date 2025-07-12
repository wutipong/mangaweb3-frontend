import { Filter, SortField, SortOrder } from "./grpc/types";

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
    user?: string;
    tag?: string;
    filter?: Filter;
    page?: number;
    itemPerPage?: number;
    search?: string;
    sort?: SortField;
    order?: SortOrder;
}): URL {
    const output = new URL("/tag", base);
    if (options != null) {
        const { page, filter, search, order, sort } = options;

        if (page != null) {
            output.searchParams.set('page', `${page}`);
        }

        if (filter == Filter.FAVORITE_TAGS) {
            output.searchParams.set('favorite_only', "true");
        }

        if (search != null) {
            output.searchParams.set('search', search);
        }

        if (order != null) {
            switch (order) {
                case SortOrder.ASCENDING:
                    output.searchParams.set('order', 'ascending');
                    break;
                case SortOrder.DESCENDING:
                    output.searchParams.set('order', 'descending');
                    break;
            }
        }

        if (sort != null) {
            switch (sort) {
                case SortField.NAME:
                    output.searchParams.set('sort', 'name');
                    break;

                case SortField.PAGECOUNT:
                    output.searchParams.set('sort', 'pagecount');
                    break;
            }
        }

    }
    return output;
}

export function browseURL(base: URL | string, options?: {
    user?: string;
    filter?: Filter;
    item_per_page?: number;
    order?: SortOrder;
    page?: number;
    search?: string;
    sort?: SortField;
    tag?: string;
}): URL {
    const output = new URL("/browse", base);

    if (options != null) {
        const { filter, item_per_page, order, page, search, sort, tag } = options;
        if (filter != null) {
            switch (filter) {
                case Filter.FAVORITE_ITEMS:
                    output.searchParams.set('filter', 'favorite_items');
                    break;
                case Filter.FAVORITE_TAGS:
                    output.searchParams.set('filter', 'favorite_tags');
                    break;
            }
        }
        if (item_per_page != null) {
            output.searchParams.set('item_per_page', `${item_per_page}`);
        }
        if (order != null) {
            switch (order) {
                case SortOrder.ASCENDING:
                    output.searchParams.set('order', 'ascending');
                    break;
                case SortOrder.DESCENDING:
                    output.searchParams.set('order', 'descending');
                    break;
            }
        }
        if (page != null) {
            output.searchParams.set('page', `${page}`);
        }

        if (search != null) {
            output.searchParams.set('search', `${search}`);
        }

        if (sort != null) {
            switch (sort) {
                case SortField.NAME:
                    output.searchParams.set('sort', 'name');
                    break;
                case SortField.CREATION_TIME:
                    output.searchParams.set('sort', 'creation_time');
                    break;
                case SortField.PAGECOUNT:
                    output.searchParams.set('sort', 'pagecount');
                    break;
            }
        }

        if (tag != null) {
            output.searchParams.set('tag', `${tag}`);
        }
    }

    return output;
}