import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';

import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
} from './ui/select';

export default function FormFieldSelect({ control, type, label }) {
  return (
    <FormField
      control={control}
      name={type}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder='Select type of pet' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='dog'>Dog</SelectItem>
                <SelectItem value='cat'>Cat</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
