import { Form } from '@/shared/components/form/FormPrimitives';
import Loader from '@/shared/components/Loader';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

const FormRoot = styled( Box, { shouldForwardProp: property => property !== '$plain' } )( ( { theme, $plain } ) => ( {
  position: 'relative',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: $plain ? 0 : theme.spacing( 3 ),
  padding: $plain ? 0 : theme.spacing( 3 ),
  borderRadius: $plain ? 0 : 12,
  backgroundColor: $plain ? 'transparent' : theme.palette.background.paper,
  overflow: $plain ? 'hidden' : 'visible'
} ) );

const LoadingOverlay = styled( Box )( ( { theme } ) => ( {
  position: 'absolute',
  zIndex: theme.zIndex.modal,
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'inherit',
  backgroundColor: alpha( '#000', .6 )
} ) );

const FormContent = styled( Box, { shouldForwardProp: property => property !== '$loading' } )( ( { $loading } ) => ( {
  minHeight: 0,
  flex: 1,
  opacity: $loading ? .5 : 1,
  pointerEvents: $loading ? 'none' : 'auto'
} ) );

const FormWrapper = ( { children, form, isLoading, onSubmit, loaderType, plain = false } ) => {
  return (
    <Form { ...form }>
      <FormRoot
        component="form"
        onSubmit={ form.handleSubmit( onSubmit ) }
        $plain={ plain }
      >
        { isLoading && (
          <LoadingOverlay>
            <Loader type={ loaderType } size={ 30 }/>
          </LoadingOverlay>
        ) }

        <FormContent $loading={ isLoading }>{ children }</FormContent>
      </FormRoot>
    </Form>
  );
};

export default FormWrapper;
