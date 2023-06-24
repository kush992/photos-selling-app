import { useEffect, useRef } from 'react';

export default function useClickOutside(callback: () => void, eventType: string) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
			if (event.target !== ref.current && event.target.contains(ref.current)) {
				callback();
			}
		};

		document.addEventListener(eventType, handleClick, true);

		return () => {
			document.removeEventListener(eventType, callback);
		};
	}, [ref, callback, eventType]);

	return ref;
}
