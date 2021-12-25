import {useTranslation} from 'react-i18next';

const useAppTranslation = (nestSpace?: string) => useTranslation(`translation`, {keyPrefix: nestSpace});

export default useAppTranslation;
