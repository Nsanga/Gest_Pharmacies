import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useMergeRefs,
} from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export const PasswordField = forwardRef(({ value, onChange, ...props }, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({
                preventScroll: true,
            })
        }
    }
    return (
        <FormControl isRequired>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <InputGroup>
                <InputRightElement>
                    <IconButton
                        variant="text"
                        aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                    />
                </InputRightElement>
                <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            </InputGroup>
        </FormControl>
    )
})
PasswordField.displayName = 'PasswordField'