import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';

import { Input } from './ui/input';

export default function FormFieldInput({ control, label, placeholder, type }) {
  return (
    <FormField
      control={control}
      name={type}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
