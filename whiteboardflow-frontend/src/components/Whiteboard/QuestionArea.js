import { Resizable } from 're-resizable';
import { Box } from '@mui/material';
import React, { useState, useLayoutEffect } from 'react';
import HelpButton from './HelpButton';

const QuestionArea = () => {
    const minWidth = 15;
    const [width, setWidth] = useState('30%'); // Start with default visible width
    const [isVisible, setIsVisible] = useState(true); // Manage visibility state
    useLayoutEffect(() => {
        setIsVisible(width > '0px');
    }, [width]);


    return (
        <Resizable
            defaultSize={{
                width: width,
                height: '95vh'
            }}
            minWidth={minWidth}
            maxWidth="80%"
            enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            }}
            handleStyles={{
                right: {
                    width: '20px', // Handle width
                    background: 'rgba(grey)',
                    cursor: 'ew-resize'
                }
            }}
            handleComponent={{
                right: <div style={{ width: '20px', cursor: 'ew-resize' }}></div>
            }}
            onResize={(e, direction, ref, d) => {
                const newWidth = parseInt(ref.style.width, 10);
                if (newWidth <= minWidth) {
                    ref.style.width = '0px';
                    setWidth('0px');
                    setIsVisible(false);
                } else {
                    setWidth(`${newWidth}px`);
                    setIsVisible(true);
                }
            }}
            onResizeStop={(e, direction, ref, d) => {
                const finalWidth = parseInt(ref.style.width, 10);
                if (finalWidth > 0 && finalWidth < minWidth) {
                    ref.style.width = `${minWidth}px`; // Ensure it snaps back to minWidth
                    setWidth(`${minWidth}px`);
                }
            }}
        >
            {isVisible && ( // ISSUE: Sometimes doesn't go visible when it's 0 width
                <Box sx={{ padding: '20px', height: '100%', overflowY: isVisible ? 'auto' : 'hidden'}}>
                    <p><strong>Question:</strong> Write a function that takes a list of numbers and returns the sum of
                        all even numbers in the list.</p>
                    <p><strong>Function Signature:</strong></p>
                    <pre>
                        <code>
                            {`def sum_of_evens(numbers: list) -> int:`}
                            <br/>
                            {'    pass'}
                        </code>
                    </pre>
                    <p><strong>Example:</strong></p>
                    <pre>
                        <code>
                            {`# Input`}
                            <br/>
                            {`numbers = [1, 2, 3, 4, 5, 6]`}
                            <br/>
                            <br/>
                            {`# Output`}
                            <br/>
                            {`12`}
                        </code>
                    </pre>
                    <p><strong>Explanation:</strong> In the list <code>[1, 2, 3, 4, 5, 6]</code>, the even numbers are
                        2, 4, and 6. Their sum is 12.</p>
                    <p><strong>Hints:</strong></p>
                    <ol>
                        <li>Use a loop or list comprehension to filter for even numbers.</li>
                        <li>The modulo operator <code>%</code> can help determine if a number is even.</li>
                    </ol>
                    <HelpButton/>
                </Box>
            )}
        </Resizable>
    );
};

export default QuestionArea;
