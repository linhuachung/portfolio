import { useDispatch, useSelector, useStore } from 'react-redux';
import { useEffect, useState } from 'react';

export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();


export function useAsyncAction() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState( false );
  const [error, setError] = useState( null );
  const [success, setSuccess] = useState( null );

  const execute = async ( action, payload = {} ) => {
    setLoading( true );
    setError( null );
    setSuccess( null );

    try {
      const result = await dispatch( action( payload ) ).unwrap();
      setSuccess( result );
      return result;
    } catch ( err ) {
      setError( err.message || 'Something went wrong' );
      throw err;
    } finally {
      setLoading( false );
    }
  };

  return { execute, loading, error, success };
}

export function useInputFocus( name, isSubmitSuccessful ) {
  const [isFocused, setIsFocused] = useState( false );

  useEffect( () => {
    const element = document.getElementById( name );
    if ( !element ) {return;}

    const checkValue = () => {
      setIsFocused( document.activeElement === element || element.value.trim() !== '' );
    };

    checkValue();

    element.addEventListener( 'focus', checkValue );
    element.addEventListener( 'blur', checkValue );
    element.addEventListener( 'input', checkValue );

    return () => {
      element.removeEventListener( 'focus', checkValue );
      element.removeEventListener( 'blur', checkValue );
      element.removeEventListener( 'input', checkValue );
    };
  }, [name] );

  useEffect( () => {
    setTimeout( () => {
      const elements = document.querySelectorAll( 'input, textarea' );
      elements.forEach( ( el ) => {
        if ( window.getComputedStyle( el ).appearance === 'menulist-button' ) {
          setIsFocused( true );
        }
      } );
    }, 300 );
  }, [] );

  useEffect( () => {
    if ( isSubmitSuccessful ) {
      setIsFocused( false );
    }
  }, [isSubmitSuccessful] );

  return { isFocused, setIsFocused };
}