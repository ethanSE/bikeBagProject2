import React, { useContext } from 'react';
import TopTube from '../assets/images/Toptube';
import Full from '../assets/images/Full';
import Front from '../assets/images/Front';
import { CustomSpecContext } from '../customSpecContext';
import cssStyle from '../styles/StyleSelection.module.css';

const StyleSelection = () => {
    const { customSpecState, setCustomSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)
    
    const handleClick = (style) => {
        setCustomSpecState({ ...customSpecState, style: style })
        setActiveCustomSpecPhase('image');
    }

    return (
        <div className={cssStyle.styleContainer}>
            <div className={customSpecState.style === 'topTube' ? cssStyle.styleItemActive : cssStyle.styleItem}
                onClick={() => handleClick('topTube')}>
                <h4>Top Tube</h4>
                <TopTube className={cssStyle.bagIcon} />
            </div>
            <div className={customSpecState.style === 'front' ? cssStyle.styleItemActive : cssStyle.styleItem}
                onClick={() => handleClick('front')}>
                <h4>Front</h4>
                <Front className={cssStyle.bagIcon} />
            </div>
            <div className={customSpecState.style === 'full' ? cssStyle.styleItemActive : cssStyle.styleItem}
                onClick={() => handleClick('full')}>
                <h4>Full</h4>
                <Full className={cssStyle.bagIcon} />
            </div>
        </div>
    )
}

export default StyleSelection;