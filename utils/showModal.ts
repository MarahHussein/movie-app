function useSingleton<T>() {
	const key = Symbol("singleton");
	return [
		function provide(v: T) {
			const vm = getCurrentInstance();
			vm?.appContext.app.provide(key, v);
		},
		function use(fallback?: T) {
			return inject(key, fallback) as T;
		},
	] as const;
}

const [provideIframeModal, useIframeModal] =
	useSingleton<(url: string) => void>();

const [provideImageModal, useImageModal] =
	useSingleton<(photos: Image[], index: number) => void>();

export { useIframeModal, provideIframeModal, useImageModal, provideImageModal };
