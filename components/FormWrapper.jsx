import { Form } from '@/components/ui/form';
import Loader from '@/components/Loader';

const FormWrapper = ( { children, form, isLoading, onSubmit, className = '', loaderType } ) => {
  const hasCustomLayout = className.includes( '!p-0' ) || className.includes( 'overflow-hidden' );
  return (
    <Form { ...form }>
      <form
        onSubmit={ form.handleSubmit( onSubmit ) }
        className={ `relative flex flex-col ${hasCustomLayout ? '' : 'gap-6'} p-10 bg-[#f5f5f5] dark:bg-secondary rounded-xl ${className}` }
        style={ { height: className.includes( 'h-full' ) ? '100%' : 'auto' } }
      >
        { isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl z-10">
            <Loader type={ loaderType } color="#00ff99" size={ 30 }/>
          </div>
        ) }

        <div className={ isLoading ? 'opacity-50 pointer-events-none' : '' }>{ children }</div>
      </form>
    </Form>
  );
};

export default FormWrapper;