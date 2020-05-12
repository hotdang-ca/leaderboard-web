/**
 * Scrolls to Y position slowly.
 * 
 * @param toY Y position to scroll to
 */
export const ScrollToSlowly = (toY: number): void => {
    console.log(`Current Y: ${window.scrollY}, scroll to: ${toY}`);

    for (let y = window.scrollY; y >= toY; y -= 5) {
        setTimeout(() => {
            console.log('Scrolling to', y);
            window.scrollTo(0, y);
        }, 150);
    }
}
