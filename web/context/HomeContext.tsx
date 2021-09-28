import { createContext, MutableRefObject, ReactNode, useRef } from "react";

type HomeContextData = {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
}

export const HomeContext = createContext({} as HomeContextData);

type ContextProviderProps = {
    children: ReactNode;
}

const ContextProvider = ({children}: ContextProviderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    return (
        <HomeContext.Provider value={
            {
                canvasRef
            }
        }>
            {children}
        </HomeContext.Provider>
    );
}

export default ContextProvider;