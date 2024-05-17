import { useState, useEffect } from 'react';

export const useSearchHandlers = () => {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialQuery = urlParams.get('search') || 'nature';
        setQuery(initialQuery);
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            search: { value: string };
        };
        const searchQuery = target.search.value;
        setQuery(searchQuery);
        window.history.pushState({}, '', `?search=${searchQuery}`);
    };

    const handleKeywordSearch = (keyword: string) => {
        setQuery(keyword);
        window.history.pushState({}, '', `?search=${keyword}`);
    };

    return { query, handleSearch, handleKeywordSearch };
};