import React from 'react';
import {DomUtils} from '../utils';

export enum Theme {
  LIGHT = `light`,
  DARK = `dark`,
  DEFAULT = `light`,
}

export interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
interface IThemeProviderProps {
  children: React.ReactNode;
  storageKey: string;
}
interface IThemeProviderState {
  theme: Theme;
}

const ThemeContext = React.createContext<IThemeContext>({
  theme: Theme.LIGHT,
  setTheme: () => {},
});

class ThemeProvider extends React.PureComponent<IThemeProviderProps, IThemeProviderState> {
  constructor(props: IThemeProviderProps) {
    super(props);

    this.state = {
      theme: Theme.DEFAULT,
    };

    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  componentDidMount(): void {
    const {storageKey} = this.props;
    const storedTheme = (localStorage.getItem(storageKey) as Theme) || Theme.DEFAULT;

    this.setState({theme: storedTheme}, () => {
      DomUtils.addBodyClass(`theme--${storedTheme}`);
    });
  }

  handleThemeChange(value: Theme) {
    const {storageKey} = this.props;
    const {theme} = this.state;
    DomUtils.removeBodyClass(`theme--${theme}`);

    this.setState({theme: value}, () => {
      DomUtils.addBodyClass(`theme--${value}`);
    });
    localStorage.setItem(storageKey, value);
  }

  render() {
    const {theme} = this.state;
    const {children} = this.props;

    return <ThemeContext.Provider value={{theme, setTheme: this.handleThemeChange}}>{children}</ThemeContext.Provider>;
  }
}

export {ThemeContext, ThemeProvider};
