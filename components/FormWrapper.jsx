import { Form } from '@/components/ui/form';
import Loader from '@/components/Loader';

const FormWrapper = ( { children, form, isLoading, onSubmit, className = '', loaderType } ) => {
  return (
    <Form { ...form }>
      <form
        onSubmit={ form.handleSubmit( onSubmit ) }
        className={ `relative flex flex-col gap-6 p-10 bg-secondary rounded-xl ${className}` }
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