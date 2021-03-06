
import React from 'react';
import { ART } from 'react-native';

const { Shape, Path, Surface } = ART;
const CIRCLE = Math.PI * 2;

export default ({ progress = 1, strokeWidth = 10, radius = 100, color = 'black', direction = 'clockwise' }) => {
    const width = radius * 2;
    const path = makeArcPath(
        strokeWidth / 2,
        strokeWidth / 2,
        0,
        progress * Math.PI * 2,
        radius - (strokeWidth / 2),
        direction,
    );
    return (
        <Surface width={width} height={width}>
            <Shape
                d={path}
                strokeCap="butt"
                stroke={color}
                strokeWidth={strokeWidth} />
        </Surface>
    );
};

function makeArcPath(x, y, startAngleArg, endAngleArg, radius, direction = 'counter-clockwise') {
    let startAngle = startAngleArg;
    let endAngle = endAngleArg;
    if (endAngle - startAngle >= CIRCLE) {
        endAngle = CIRCLE + (endAngle % CIRCLE);
    } else {
        endAngle %= CIRCLE;
    }
    startAngle %= CIRCLE;
    const angle = startAngle > endAngle ? CIRCLE - startAngle + endAngle : endAngle - startAngle;

    if (angle >= CIRCLE) {
        return Path()
            .moveTo(x + radius, y)
            .arc(0, radius * 2, radius, radius)
            .arc(0, radius * -2, radius, radius)
            .close();
    }

    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
    endAngle *= directionFactor;
    startAngle *= directionFactor;
    const startSine = Math.sin(startAngle);
    const startCosine = Math.cos(startAngle);
    const endSine = Math.sin(endAngle);
    const endCosine = Math.cos(endAngle);

    const arcFlag = angle > Math.PI ? 1 : 0;
    const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

    return `M${x + (radius * (1 + startSine))} ${y + radius - (radius * startCosine)}
          A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x + (radius * (1 + endSine))} ${y + radius - (radius * endCosine)}`;
}
