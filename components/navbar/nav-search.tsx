"use client";

import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

function SearchInputWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    router.push(`/products?${params.toString()}`);
  }, 600);

  return (
    <InputGroup>
      <InputGroupInput
        onChange={(e) => handleSearch(e.target.value)}
        id="input-group-url"
        type="search"
        name="query"
        placeholder="Search product..."
      />
      <InputGroupAddon align="inline-start">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}

export default function NavSearch() {
  return (
    <Field>
      <Suspense
        fallback={
          <div className="h-10 w-full animate-pulse rounded bg-neutral-100" />
        }>
        <SearchInputWrapper />
      </Suspense>
    </Field>
  );
}
