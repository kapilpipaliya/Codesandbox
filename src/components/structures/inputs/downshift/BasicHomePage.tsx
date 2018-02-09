import * as React from 'react';
import * as Downshift from 'downshift';

export default function BasicAutocomplete({items, onChange}) {
  return (
    <Downshift
      onChange={onChange}
      render={({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div>
          <input {...getInputProps({placeholder: 'Favorite color ?'})} />
          {isOpen ? (
            <div style={{border: '1px solid #ccc'}}>
              {items
                .filter(
                  i =>
                    !inputValue ||
                    i.toLowerCase().includes(inputValue.toLowerCase()),
                )
                .map((item, index) => (
                  <div
                    {...getItemProps({item})}
                    key={item}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? 'gray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    />
  );
}

// function App() {
//   return (
//     <BasicAutocomplete
//       items={['apple', 'orange', 'carrot']}
//       onChange={selectedItem => console.log(selectedItem)}
//     />
//   )
// }

// downshift is the only component. 
// It doesn't render anything itself, it just calls the render function and renders that.
// "Use a render prop!"!
// <Downshift render={/* your JSX here! */} />.