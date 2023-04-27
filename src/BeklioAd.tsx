import React, {useEffect} from 'react';
interface Props {
    className?: string;
    width?: string;
    style?: React.CSSProperties;
    height?: string;
    client: string;
    config?: Config,
    slot: string;
    children?: React.ReactNode;
}
type Config = {
    border?:boolean,
    dark?:boolean,
    rounded?:string | boolean,
    center?:boolean,
    block?: boolean,
}


export function BeklioAd({
                             className = '',
                             config,
                             style,
                             width,
                             height,
                             client,
                             slot,
                             children,
                             ...rest
                         }: Props) {


    useEffect(() => {
        const p: any = {};

        p.client = client;

        try {
            if (typeof window === 'object') {
                ((window as any).adsbybeklio = (window as any).adsbybeklio || []).push(p);
            }
        } catch {
            // Pass
        }
    }, []);
    let styles:React.CSSProperties = {};

    let dataAttributes = {};
    if (config){
        dataAttributes = Object.keys(config).reduce((obj, key) => {
            // @ts-ignore
            obj[`data-style-${key}`] = config[key];
            return obj;
        }, {});
    }

    styles.display = "block";

    if (width && height){
        styles.display = "inline-block";
        styles.width = width;
        styles.height = height;
    }
    let newStyle:React.CSSProperties = {};
    newStyle = {...style , ...styles}

    return (
        <ins

            className={`beklio_ad ${className}`}
            style={newStyle}
            data-ad-client={client}
            data-ad-slot={slot}
            {...dataAttributes}
            {...rest}
        >
            {children}
        </ins>
    );
}