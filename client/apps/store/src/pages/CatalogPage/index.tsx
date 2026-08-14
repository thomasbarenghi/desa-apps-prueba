import { Box, Flex, Heading, Input, InputGroup, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react"
import Magnifier from "@gravity-ui/icons/Magnifier"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CategoryChip } from "../../components/CategoryChip"
import { EmptyState } from "../../components/EmptyState"
import { ProductCard } from "../../components/ProductCard"
import { useCatalog } from "../../hooks/useCatalog"

export const CatalogPage = () => {
  const { categories, products, isLoading } = useCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState("")

  const rawCategory = searchParams.get("cat")
  const selectedCategory = rawCategory ? Number(rawCategory) : null

  const setCategory = (id: number | null) => {
    if (id === null) setSearchParams({})
    else setSearchParams({ cat: String(id) })
  }

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        if (selectedCategory !== null && product.categoryId !== selectedCategory) return false
        if (search && !product.name.toLowerCase().includes(search.trim().toLowerCase())) return false
        return true
      }),
    [products, selectedCategory, search],
  )

  return (
    <VStack align="stretch" gap="8">
      <VStack align="start" gap="1">
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold">
          Catálogo
        </Heading>
        <Text color="fg.muted">Encontrá lo que se te antoje hoy.</Text>
      </VStack>

      <InputGroup
        startElement={<Magnifier width={16} height={16} color="fg.subtle" />}
        maxW="sm"
      >
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
          borderRadius="full"
          bg="bg.panel"
        />
      </InputGroup>

      <Flex gap="2" overflowX="auto" paddingBottom="2" scrollSnapType="x">
        <CategoryChip label="Todos" active={selectedCategory === null} onClick={() => setCategory(null)} />
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            label={category.name}
            active={selectedCategory === category.id}
            onClick={() => setCategory(category.id)}
          />
        ))}
      </Flex>

      {isLoading ? (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={{ base: "3", md: "5" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height="220px" borderRadius="2xl" />
          ))}
        </SimpleGrid>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Magnifier width={40} height={40} />}
          title="No encontramos nada"
          description="Probá con otra búsqueda u otra categoría."
        />
      ) : (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={{ base: "3", md: "5" }}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      )}

      <Box height="8" />
    </VStack>
  )
}
